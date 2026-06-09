from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from data import PROJECTS, SKILLS

app = FastAPI(title="Portfolio API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:4173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ContactMessage(BaseModel):
    name: str
    email: str
    subject: Optional[str] = ""
    message: str


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.get("/api/projects")
def get_projects():
    return PROJECTS


@app.get("/api/skills")
def get_skills():
    return SKILLS


@app.post("/api/contact")
def send_contact(msg: ContactMessage):
    print(f"\n--- New message from {msg.name} ({msg.email}) ---")
    print(f"Subject: {msg.subject}")
    print(f"Message: {msg.message}\n")
    return {"success": True, "message": "Message received!"}
