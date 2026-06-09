#!/bin/bash
# Starts the FastAPI backend and Vite frontend in parallel

ROOT="$(cd "$(dirname "$0")" && pwd)"

echo "Starting backend..."
cd "$ROOT/backend"
source venv/bin/activate
uvicorn main:app --host 0.0.0.0 --port 8000 --reload &
BACKEND_PID=$!

echo "Starting frontend..."
cd "$ROOT/frontend"
npm run dev &
FRONTEND_PID=$!

echo ""
echo "  Backend  → http://localhost:8000"
echo "  Frontend → http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers."

trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" SIGINT SIGTERM
wait
