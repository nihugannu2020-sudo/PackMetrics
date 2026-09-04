from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix='/chat', tags=['chat'])


class ChatRequest(BaseModel):
    question: str
    role: str = 'manufacturer'


@router.post('')
def chat(payload: ChatRequest):
    return {
        'answer': 'The package appears to be missing a clear mandatory declaration block and the net quantity may not meet readability expectations. Relevant rule: Rule 6(1). This is a decision-support explanation, not a legal determination.',
        'confidence': 0.92,
        'grounded_rules': ['Rule 6(1)', 'Rule 6(2)'],
    }
