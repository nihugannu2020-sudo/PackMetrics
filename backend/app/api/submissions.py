from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix='/submissions', tags=['submissions'])


class SubmissionDecision(BaseModel):
    scan_id: str
    decision: str
    remarks: str = ''


@router.get('')
def list_submissions():
    return {
        'items': [
            {'scan_id': 'SCN2001', 'product': 'Wheat Flour 1kg', 'status': 'Pending', 'official_decision': 'Awaiting review'},
            {'scan_id': 'SCN2002', 'product': 'Basmati Rice 5kg', 'status': 'Approved', 'official_decision': 'Approved'},
        ]
    }


@router.post('/decision')
def create_decision(payload: SubmissionDecision):
    return {
        'ok': True,
        'scan_id': payload.scan_id,
        'decision': payload.decision,
        'remarks': payload.remarks,
        'message': 'Decision recorded successfully.'
    }
