from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix='/auth', tags=['auth'])


class LoginRequest(BaseModel):
    email: str
    password: str


@router.post('/login')
def login(payload: LoginRequest):
    demo_map = {
        'demo.gov@metrology.local': 'official',
        'demo.manufacturer@metrology.local': 'manufacturer',
        'demo.admin@metrology.local': 'admin',
    }
    role = demo_map.get(payload.email.lower())
    if not role:
        return {'ok': False, 'message': 'Invalid demo account'}
    return {
        'ok': True,
        'role': role,
        'user': {'email': payload.email, 'role': role},
        'message': 'Demo authentication successful'
    }
