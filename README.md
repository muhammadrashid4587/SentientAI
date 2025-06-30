# SentientAI

SentientAI is a modular, AI-driven assistant framework designed to serve as a second brain, memory keeper, and task executor. Built using FastAPI, React, and Weaviate, it combines a vector database with LLMs for a deeply personal and productive experience.

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/muhammadrashid4587/SentientAI.git
cd SentientAI
```

### 2. Create an `.env` File
```bash
cp .env.example .env
```
Edit `.env` to include your:
- OpenAI API key
- Weaviate configuration
- Any other required keys or secrets

### 3. Start the System with Docker Compose
```bash
docker-compose up --build
```
This will launch the backend, frontend, and vector DB in containers.

### 4. Access the Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000/docs
- Weaviate Console: http://localhost:8080

## 🧪 Development

### Run Services Individually

#### Backend
```bash
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

#### Vector DB (Weaviate)
If running separately:
```bash
docker run -d -p 8080:8080 -e QUERY_DEFAULTS_LIMIT=25 \
  -e AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED=true \
  semitechnologies/weaviate
```

## 📦 Project Structure
```
SentientAI/
├── backend/             # FastAPI server
│   ├── api/             # API routes
│   └── memory/          # Semantic memory engine
├── frontend/            # Vite + React + Three.js UI
│   └── src/
│       ├── components/
│       └── visuals/
├── docker-compose.yml   # Full system orchestration
└── .env.example         # Environment variable template
```

## 📄 License
This project is licensed under the MIT License. See the LICENSE file for details.

## 🤝 Contributing
1. Fork the repo
2. Create a new branch
3. Make your changes
4. Submit a pull request

## 🌐 Author
**Muhammad Rashid**  
GitHub: [@muhammadrashid4587](https://github.com/muhammadrashid4587)
