import os
import openai
from dotenv import load_dotenv

from app.services.retriever import search_memory

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

def chat_with_memory(prompt: str, top_k: int = 5) -> dict:
    # 1. Recall relevant memories
    memories = search_memory(prompt, top_k)
    context_lines = [f"- {m['text']}" for m in memories]
    context = "Here are prior memories:\n" + "\n".join(context_lines)

    # 2. Prepare messages
    messages = [
        {"role": "system", "content": "You are a helpful assistant. Use these memories:\n" + context},
        {"role": "user",   "content": prompt},
    ]

    # 3. Try the paid API, fallback on failure
    try:
        resp = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=messages
        )
        answer = resp.choices[0].message.content.strip()
    except Exception:
        # On any failure, echo the memories:
        answer = (
            "I’m currently unable to call the API. Here’s what I recall:\n"
            + "\n".join(context_lines)
        )

    return {
        "response": answer,
        "source_memories": memories
    }
