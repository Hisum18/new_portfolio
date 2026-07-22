# Personal Portfolio

A full-stack portfolio website with a React frontend and FastAPI backend.

**Live site**: https://new-portfolio-ochre-zeta.vercel.app

## Tech Stack

**Frontend**
- React + Vite
- Tailwind CSS

**Backend**
- FastAPI (Python)
- Uvicorn

**Hosting**
- Frontend: Vercel
- Backend: Railway

## Running Locally

**Backend**
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173` — backend at `http://localhost:8000`.

The frontend reads the API base URL from `VITE_API_URL` (see `frontend/.env`). The
backend's allowed CORS origins are listed in `backend/main.py`, so a new deployment
URL needs to be added there.
