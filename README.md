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
