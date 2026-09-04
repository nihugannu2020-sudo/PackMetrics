import os
import uuid
import json
from fastapi import APIRouter, HTTPException, UploadFile, File
from pydantic import BaseModel
from typing import List, Optional

from app.services.ocr_service import extract_ocr_from_image_bytes
from app.services.compliance_service import run_rule_engine
from app.core.database import save_scan, get_scan, get_all_scans, update_scan_status

router = APIRouter(prefix='/scans', tags=['scans'])

@router.post('/upload')
async def upload_scan(files: List[UploadFile] = File(...), product_name: Optional[str] = None):
    if not files:
        raise HTTPException(status_code=400, detail='At least one image is required.')
    if len(files) > 6:
        raise HTTPException(status_code=400, detail='You can upload up to 6 package images.')

    scan_id = f"SCN{uuid.uuid4().hex[:6].upper()}"
    saved_images = []
    combined_ocr = {}
    
    for file in files:
        if not file.filename or not file.filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            raise HTTPException(status_code=400, detail='Only JPG, JPEG, and PNG files are allowed.')
        image_bytes = await file.read()
        
        # Save image to uploads/
        ext = file.filename.split('.')[-1]
        new_filename = f"{scan_id}_{uuid.uuid4().hex[:4]}.{ext}"
        filepath = os.path.join("uploads", new_filename)
        with open(filepath, "wb") as f:
            f.write(image_bytes)
        saved_images.append(f"/uploads/{new_filename}")

        # Run OCR
        ocr_result = extract_ocr_from_image_bytes(image_bytes, file.filename)
        # Merge non-empty OCR results
        for k, v in ocr_result.items():
            if v and not combined_ocr.get(k):
                combined_ocr[k] = v

    prod_name = product_name or combined_ocr.get('product_name', 'Unknown Product')
    manufacturer = combined_ocr.get('manufacturer', 'Unknown Manufacturer')
    
    # Run Compliance Engine
    compliance_report = run_rule_engine(combined_ocr)
    
    # Save to Database
    save_scan(
        scan_id=scan_id,
        product_name=prod_name,
        status='Pending',
        manufacturer=manufacturer,
        ocr_data=combined_ocr,
        compliance_report=compliance_report,
        images=saved_images
    )

    return {
        'ok': True,
        'scan_id': scan_id,
        'product_name': prod_name,
        'files': saved_images,
        'ocr': combined_ocr,
        'compliance_report': compliance_report,
        'message': 'Upload accepted, OCR extraction, and compliance check completed.'
    }


@router.post('/{scan_id}/analyze')
def analyze_scan(scan_id: str):
    scan = get_scan(scan_id)
    if not scan:
        raise HTTPException(status_code=404, detail="Scan not found")
        
    report = json.loads(scan['compliance_report'])
    return {
        'ok': True,
        'scan_id': scan_id,
        'status': 'completed',
        'overall_result': report.get('overall_result'),
        'checks': report.get('checks', []),
    }


@router.get('/{scan_id}')
def get_scan_endpoint(scan_id: str):
    scan = get_scan(scan_id)
    if not scan:
        raise HTTPException(status_code=404, detail="Scan not found")
    
    return {
        'scan_id': scan['id'],
        'product': scan['product_name'],
        'status': scan['status'],
        'manufacturer': scan['manufacturer'],
        'submitted_on': scan['submitted_on'],
        'ocr': json.loads(scan['ocr_data']),
        'compliance_report': json.loads(scan['compliance_report']),
        'images': json.loads(scan['images'])
    }


@router.get('')
def list_scans():
    scans = get_all_scans()
    return {
        'items': [
            {
                "id": s["id"],
                "product": s["product_name"],
                "status": s["status"],
                "submitted_on": s["submitted_on"],
                "manufacturer": s["manufacturer"],
                "images": json.loads(s["images"])
            }
            for s in scans
        ]
    }
