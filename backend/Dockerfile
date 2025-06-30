# backend/Dockerfile

# 1. Base image with Python
FROM python:3.10-slim

# 2. Set working dir
WORKDIR /app

# 3. Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 4. Copy the rest of the code
COPY . .

# 5. Expose FastAPI port
EXPOSE 8000

# 6. Command to run Uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
