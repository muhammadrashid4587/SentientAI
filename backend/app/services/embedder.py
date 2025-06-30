# import os
# import openai
# from dotenv import load_dotenv

# # 1. Load environment variables from .env
# load_dotenv()
# # 2. Set the API key
# openai.api_key = os.getenv("OPENAI_API_KEY")

# def embed_text(text: str) -> list[float]:
#     """
#     Calls OpenAI's embedding endpoint to turn text into a vector.
#     Returns a list of floats (the embedding).
#     """
#     response = openai.embeddings.create(
#         model="text-embedding-ada-002",
#         input=[text]
#     )
#     # We take the first (and only) embedding from the response
#     return response["data"][0]["embedding"]


# backend/app/services/embedder.py

from sentence_transformers import SentenceTransformer

# 1. Load a lightweight, high-quality model once at startup
model = SentenceTransformer("all-MiniLM-L6-v2")

def embed_text(text: str) -> list[float]:
    """
    Converts `text` into an embedding vector using a local transformer model.
    No external API calls; runs entirely on your machine.
    """
    # 2. model.encode returns a numpy array – convert it to a plain Python list
    vector = model.encode(text)
    return vector.tolist()
