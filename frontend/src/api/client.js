// src/api/client.js

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function logMemory(text) {
  const res = await fetch(`${API_BASE}/memory/log`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error('Unable to save memory');
  return res.json();
}

export async function recallMemories(prompt, top_k = 5) {
  const res = await fetch(`${API_BASE}/memory/recall`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, top_k }),
  });
  if (!res.ok) throw new Error('Unable to recall memories');
  return res.json();
}
