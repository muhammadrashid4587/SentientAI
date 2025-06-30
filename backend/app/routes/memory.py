# backend/app/routes/memory.py
import traceback
from fastapi import APIRouter, HTTPException
from app.models.memory import (
    MemoryLogRequest,
    MemoryLogResponse,
    MemoryRecallRequest,
    MemoryRecallResponse,
)
from app.services.embedder import embed_text
from app.services.retriever import store_to_weaviate, search_memory

router = APIRouter()

@router.post("/log", response_model=MemoryLogResponse)
def log_memory(req: MemoryLogRequest):
    """
    POST /memory/log
    """
    # 1) Embed the text
    vector = embed_text(req.text)

    # 2) Store into Weaviate
    try:
        result = store_to_weaviate(req.text, vector)
        return MemoryLogResponse(**result)
    except Exception as e:
        raise HTTPException(500, detail="Failed to store memory")

# @router.post("/recall", response_model=MemoryRecallResponse)
# def recall_memory(req: MemoryRecallRequest):
#     """
#     POST /memory/recall
#     """
#     try:
#         hits = search_memory(req.prompt, top_k=req.top_k)
#         return MemoryRecallResponse(results=hits)
#     except Exception:
#         raise HTTPException(500, detail="Recall failed")


@router.post("/recall", response_model=MemoryRecallResponse)
def recall_memory(request: MemoryRecallRequest) -> dict:
    try:
        hits = search_memory(request.prompt, request.top_k)
        return {"results": hits}
    except Exception as e:
        # Log the full stack trace to the console
        traceback.print_exc()
        # Re-raise so uvicorn will show the 500 + traceback in your terminal
        raise HTTPException(status_code=500, detail=f"Recall failed: {e}")