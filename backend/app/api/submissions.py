from fastapi import APIRouter
from pydantic import BaseModel
import json

from app.core.database import get_all_scans, update_scan_status

router = APIRouter(prefix='/submissions', tags=['submissions'])


class SubmissionDecision(BaseModel):
    scan_id: str
    decision: str
    remarks: str = ''


@router.get('')
def list_submissions():
    scans = get_all_scans()
    return {
        'items': [
            {
                'scan_id': s['id'],
                'product': s['product_name'],
                'status': s['status'],
                'official_decision': s['status'],
                'submitted_on': s['submitted_on'],
                'manufacturer': s['manufacturer']
            }
            for s in scans
        ]
    }


@router.post('/decision')
def create_decision(payload: SubmissionDecision):
    update_scan_status(payload.scan_id, payload.decision)
    return {
        'ok': True,
        'scan_id': payload.scan_id,
        'decision': payload.decision,
        'remarks': payload.remarks,
        'message': 'Decision recorded successfully.'
    }
