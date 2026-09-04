from fastapi import APIRouter

router = APIRouter(prefix='/users', tags=['users'])


@router.get('')
def list_users():
    return {
        'items': [
            {'id': 'U-001', 'name': 'Sanjana Iyer', 'role': 'Government Official', 'status': 'active'},
            {'id': 'U-002', 'name': 'ABC Foods Pvt Ltd', 'role': 'Manufacturer', 'status': 'active'},
        ]
    }
