from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, scans, submissions, reports, rules, users, chatbot, analytics
from app.core.config import settings

from fastapi.staticfiles import StaticFiles
import os

app = FastAPI(title='Metrology Compliance Platform', version='1.0.0')

os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(auth.router, prefix='/api')
app.include_router(scans.router, prefix='/api')
app.include_router(submissions.router, prefix='/api')
app.include_router(reports.router, prefix='/api')
app.include_router(rules.router, prefix='/api')
app.include_router(users.router, prefix='/api')
app.include_router(chatbot.router, prefix='/api')
app.include_router(analytics.router, prefix='/api')

@app.get('/health')
def health():
    return {'status': 'ok', 'demo_mode': settings.demo_mode}
