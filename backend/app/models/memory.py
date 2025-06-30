from pydantic import BaseModel, Field
from typing import List

# ─── Models for /memory/log ──────────────────────────────────────────────────

class MemoryLogRequest(BaseModel):
    text: str
    """
    Incoming request: must be a JSON object with a single "text" field.
    """

class MemoryLogResponse(BaseModel):
    status: str
    text: str
    vector_length: int
    """
    Response after logging:
      - status: "ok"
      - text: the same string you sent
      - vector_length: length of the embedding vector
    """

# ─── Models for /memory/recall ────────────────────────────────────────────────

class MemoryRecallRequest(BaseModel):
    prompt: str
    top_k: int = Field(
        5,
        description="Number of nearest memories to return"
    )
    """
    Incoming request: JSON object with a "prompt" field to query similar memories.
    """

class MemoryItem(BaseModel):
    text: str
    distance: float
    """
    A single recalled memory entry plus its similarity score.
    """

class MemoryRecallResponse(BaseModel):
    results: List[MemoryItem]
    """
    Response: list of MemoryItem under the key "results".
    """


class ChatRequest(BaseModel):
    prompt: str
    top_k: int = 5
    """
    prompt: the user’s question;
    top_k: how many memories to stitch into context.
    """

class ChatResponse(BaseModel):
    response: str
    source_memories: List[MemoryItem]
    """
    response: the assistant’s answer;
    source_memories: the slice of memories it used.
    """