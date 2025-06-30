from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.memory import router as memory_router

app = FastAPI()

# ─── CORS ────────────────────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # your Vite URL
    allow_methods=["*"],                      # allow GET, POST, OPTIONS, etc.
    allow_headers=["*"],                      # allow Content-Type
)
# ────────────────────────────────────────────────────────────────────────────────

app.include_router(memory_router, prefix="/memory", tags=["memory"])
