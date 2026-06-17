from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from data import PROJECTS, SKILLS

app = FastAPI(title="Portfolio API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:4173", "https://new-portfolio-ochre-zeta.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.get("/api/projects")
def get_projects():
    return PROJECTS


@app.get("/api/skills")
def get_skills():
    return SKILLS


