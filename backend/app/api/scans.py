from fastapi import APIRouter, HTTPException, UploadFile, File
from pydantic import BaseModel
from typing import List, Optional

from app.services.ocr_service import extract_ocr_from_image_bytes

router = APIRouter(prefix='/scans', tags=['scans'])


class ScanStatus(BaseModel):
    id: str
    product: str
    status: str
    submitted_on: str


@router.post('/upload')
async def upload_scan(files: List[UploadFile] = File(...), product_name: Optional[str] = None):
    if not files:
        raise HTTPException(status_code=400, detail='At least one image is required.')
    if len(files) > 6:
        raise HTTPException(status_code=400, detail='You can upload up to 6 package images.')

    extracted_items = []
    for file in files:
        if not file.filename or not file.filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            raise HTTPException(status_code=400, detail='Only JPG, JPEG, and PNG files are allowed.')
        image_bytes = await file.read()
        extracted_items.append({
            'filename': file.filename,
            'ocr': extract_ocr_from_image_bytes(image_bytes, file.filename),
        })

    primary = extracted_items[0]['ocr']
    return {
        'ok': True,
        'scan_id': 'SCN2045',
        'product_name': product_name or primary.get('product_name', 'Wheat Flour'),
        'files': [item['filename'] for item in extracted_items],
        'ocr': primary,
        'message': 'Upload accepted and OCR extraction completed.'
    }


@router.post('/{scan_id}/analyze')
def analyze_scan(scan_id: str):
    return {
        'ok': True,
        'scan_id': scan_id,
        'status': 'completed',
        'overall_result': 'NON-COMPLIANT',
        'checks': [
            {'check': 'Mandatory Declaration', 'status': 'FAIL', 'confidence': 0.92},
            {'check': 'MRP Declaration', 'status': 'PASS', 'confidence': 0.97},
            {'check': 'Net Quantity', 'status': 'FAIL', 'confidence': 0.88},
        ],
    }


@router.get('/{scan_id}')
def get_scan(scan_id: str):
    return {
        'scan_id': scan_id,
        'product': 'Wheat Flour',
        'status': 'Pending',
        'manufacturer': 'ABC Foods Pvt Ltd',
        'submitted_on': '24/05/2025',
        'ocr': {
            'product_name': 'Wheat Flour',
            'net_quantity': '1 kg',
            'mrp': '₹45.00',
            'batch_no': 'B1234',
            'manufacturer': 'ABC Foods Pvt Ltd',
            'place_of_manufacture': 'Ahmedabad, Gujarat',
            'manufacturing_date': '05/05/2025',
        },
    }


@router.get('')
def list_scans():
    return {
        'items': [
            ScanStatus(id='SCN2001', product='Wheat Flour 1kg', status='Pending', submitted_on='24/05/2025'),
            ScanStatus(id='SCN2002', product='Basmati Rice 5kg', status='Approved', submitted_on='23/05/2025'),
            ScanStatus(id='SCN2003', product='Sugar 1kg', status='Rejected', submitted_on='22/05/2025'),
        ]
    }
