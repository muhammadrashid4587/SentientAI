# import os
# import weaviate
# from dotenv import load_dotenv
# from app.services.embedder import embed_text

# # 1. Load .env and grab the Weaviate URL
# load_dotenv()
# WEAVIATE_URL = os.getenv("WEAVIATE_URL")

# # 2. Create a Weaviate client instance
# client = weaviate.Client(url=WEAVIATE_URL)

# # 3. Ensure the "Memory" class exists (schema setup)
# def ensure_schema():
#     classes = client.schema.get()["classes"]
#     names = [c["class"] for c in classes]
#     if "Memory" not in names:
#         client.schema.create_class({
#             "class": "Memory",
#             "properties": [
#                 {"name": "text", "dataType": ["text"]},
#             ],
#             "vectorizer": "none"  # we supply our own vectors
#         })

# # Run schema setup on import
# ensure_schema()

# def store_to_weaviate(text: str, vector: list[float]) -> dict:
#     """
#     Stores a single object in Weaviate using the v3 client.
#     """
#     # Use the correct parameter names for the v3 client:
#     client.data_object.create(
#         data_object={"text": text},   # <— here
#         class_name="Memory",          # <— here
#         vector=vector                 # <— and here
#     )
#     return {
#         "status": "ok",
#         "text": text,
#         "vector_length": len(vector)
#     }

# # def search_memory(prompt: str, top_k: int = 5) -> list[dict]:
# #     """
# #     Given a prompt string, embed it locally and query Weaviate for the top_k
# #     most similar Memory objects. Returns a list of dicts with 'text' and 'distance'.
# #     """
# #     # 1. Embed the prompt using your local model
# #     prompt_vec = embed_text(prompt)

# #     # 2. Perform a vector search in Weaviate
# #     response = client.query.get(
# #         "Memory",
# #         ["text"]
# #     ).with_near_vector({
# #         "vector": prompt_vec,
# #         "certainty": 0.0  # Or use 'distance' by setting 'distance': True
# #     }).with_limit(top_k).do()

# #     # 3. Extract hits
# #     results = []
# #     for item in response["data"]["Get"]["Memory"]:
# #         # Weaviate returns distance under '_additional'
# #         info = item["_additional"]
# #         results.append({
# #             "text": item["text"],
# #             "distance": info.get("certainty") or info.get("distance")
# #         })
# #     return results



# def search_memory(prompt: str, top_k: int = 5) -> list[dict]:
#     """
#     Given a prompt string, embed it and query Weaviate for the top_k
#     most similar Memory objects, returning a list of dicts with 'text' and 'distance'.
#     """
#     # 1. Embed the prompt
#     prompt_vec = embed_text(prompt)

#     response = (
#         client.query.get("Memory", ["text"])
#         .with_near_vector({"vector": prompt_vec})
#         .with_additional("distance")
#         .with_limit(top_k)
#         .do()
#     )

#     # Safely pull out the list of memories
#     hits = response.get("data", {}).get("Get", {}).get("Memory", [])

#     results = []
#     for item in hits:
#         add = item.get("_additional", {})
#         results.append({
#             "text": item.get("text", ""),
#             "distance": add.get("distance", 0.0)
#         })
#     return results

import os
import weaviate
from dotenv import load_dotenv
from typing import List, Dict, Any
from app.services.embedder import embed_text

# Load .env and connect to Weaviate
load_dotenv()
WEAVIATE_URL = os.getenv("WEAVIATE_URL", "http://localhost:8080")
client = weaviate.Client(url=WEAVIATE_URL)

def ensure_schema():
    """
    Ensure a 'Memory' class exists, with a single 'text' property.
    """
    classes = client.schema.get().get("classes", [])
    if not any(c["class"] == "Memory" for c in classes):
        client.schema.create_class({
            "class": "Memory",
            "properties": [
                {
                    "name": "text",
                    "dataType": ["text"]
                }
            ]
        })

# Run once at import
ensure_schema()

def store_to_weaviate(text: str, vector: List[float]) -> Dict[str, Any]:
    """
    Store a new Memory with its embedding.
    """
    client.data_object.create(
        data_object={"text": text},
        class_name="Memory",
        vector=vector
    )
    return {
        "status": "ok",
        "text": text,
        "vector_length": len(vector)
    }

def search_memory(prompt: str, top_k: int = 5) -> List[Dict[str, Any]]:
    """
    Embed the prompt locally, then query Weaviate with a nearVector search.
    Returns a list of {"text": str, "distance": float}.
    """
    # 1) embed locally
    prompt_vec = embed_text(prompt)

    # 2) run the vector search
    response = (
        client.query
              .get("Memory", ["text"])
              .with_near_vector({"vector": prompt_vec})
              .with_additional("distance")
              .with_limit(top_k)
              .do()
    )

    # 3) extract hits
    hits = response.get("data", {}).get("Get", {}).get("Memory", [])
    results: List[Dict[str, Any]] = []
    for h in hits:
        text = h.get("text", "")
        dist = h.get("_additional", {}).get("distance", 0.0)
        results.append({"text": text, "distance": dist})
    return results
