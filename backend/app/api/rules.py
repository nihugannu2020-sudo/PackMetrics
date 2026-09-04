from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix='/rules', tags=['rules'])


class RuleCreate(BaseModel):
    name: str
    version: str
    effective_date: str
    status: str = 'active'


@router.get('')
def list_rules():
    return {
        'items': [
            {'id': 'R-101', 'name': 'Legal Metrology (Packaged Commodities) Rules, 2011', 'version': 'V4.2', 'effective_date': '01/07/2024', 'status': 'active'},
            {'id': 'R-102', 'name': 'Packaged Commodities Amendment Rules', 'version': 'V2.1', 'effective_date': '15/04/2023', 'status': 'active'},
        ]
    }


@router.get('/{rule_id}')
def get_rule(rule_id: str):
    if rule_id == 'R-101':
        return {'id': rule_id, 'name': 'Legal Metrology (Packaged Commodities) Rules, 2011', 'version': 'V4.2', 'effective_date': '01/07/2024'}
    raise HTTPException(status_code=404, detail='Rule not found.')


@router.post('')
def create_rule(payload: RuleCreate):
    return {'ok': True, 'rule': {'id': 'R-120', **payload.model_dump()}}
