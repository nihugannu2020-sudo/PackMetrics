# Metrology Compliance Platform

## Overview

This project is a full-stack Smart India Hackathon 2026 prototype for AI-assisted compliance checking of packaged commodities under the Legal Metrology (Packaged Commodities) Rules, 2011. It presents a role-based platform for manufacturers, government officials, and the supervising authority with a strong emphasis on human decision-making and explainable compliance screening.

## Architecture

- Frontend: React + Vite + JavaScript
- Backend: FastAPI + Python
- Database: Supabase Postgres
- AI / CV modules: OpenCV, OCR, deterministic rule engine, AI assistant abstraction
- Demo mode: seeded data and simulated OCR/compliance logic when external APIs are unavailable

## Technology stack

- React.js
- JavaScript
- Vite
- Lucide React
- FastAPI
- Python
- Supabase
- PostgreSQL
- OpenCV
- OCR module
- Rule engine
- AI assistant abstraction

## Folder structure

```text
.
├── frontend/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── backend/
│   ├── app/
│   ├── .env.example
│   ├── requirements.txt
│   └── README.md
├── database/
│   └── schema.sql
├── README.md
└── .gitignore
```

## Frontend setup

```bash
cd frontend
npm install
npm run dev
```

Frontend is served at http://localhost:5173 by default.

## Backend setup

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Supabase setup

1. Create a new Supabase project.
2. Connect a PostgreSQL database.
3. Copy values into your environment variables.
4. Run the SQL schema in the database.

## Environment variables

See backend/.env.example.

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/metrology
GOOGLE_API_KEY=
OPENAI_API_KEY=
DEMO_MODE=true
ENVIRONMENT=development
```

## OCR setup

The platform is structured to support a modular OCR service. In demo mode, OCR responses are simulated; in production, replace the service with a provider-specific implementation.

## Demo mode

Set `DEMO_MODE=true` to use seeded data and simulated OCR/compliance flows. This ensures the demo works even without external API keys.

## Running the app

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## API documentation

FastAPI auto generates OpenAPI docs at:

- http://localhost:8000/docs
- http://localhost:8000/redoc

## Database schema

The database schema is documented in the SQL file under database/schema.sql.

## AI integration

The application separates:

- OpenCV / image preprocessing
- OCR service
- Rule engine
- AI assistant

This allows each module to be upgraded independently while keeping the official decision-making responsibility with government officials.

## Deployment

The prototype is designed for local demo execution and can later be deployed behind a secure web server or managed platform with environment variables configured and Supabase enabled.

## Notes

- This is a decision-support prototype.
- AI assistance is not a legal authority.
- Final approval or rejection remains with authorized government officials.
