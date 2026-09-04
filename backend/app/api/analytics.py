from fastapi import APIRouter

router = APIRouter(prefix='/analytics', tags=['analytics'])


@router.get('')
def analytics():
    return {
        'total_inspections': 1248,
        'compliance_rate': 68,
        'non_compliance_rate': 10,
        'common_violations': ['Mandatory declaration missing', 'Readability issues', 'Net quantity unclear'],
        'approval_trend': [55, 62, 48, 74, 80, 90, 83],
    }
