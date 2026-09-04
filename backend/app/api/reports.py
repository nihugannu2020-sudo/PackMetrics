from fastapi import APIRouter

router = APIRouter(prefix='/reports', tags=['reports'])


@router.get('/{report_id}')
def get_report(report_id: str):
    return {
        'report_id': report_id,
        'product': 'Wheat Flour',
        'status': 'Non-compliant',
        'summary': 'Mandatory declaration and net quantity clarity require correction before approval.',
        'recommendation': 'Recommend resubmission.',
    }
