# 📝 Full-Stack Journal Application
A fully containerized, test-driven journal application built with FastAPI, React, and Docker, featuring complete CI automation using GitHub Actions.
The application allows users to create, edit, and manage personal journal entries with secure authentication and optional sentiment analysis.

## ✨ Key Features

### FastAPI Backend
- JWT-based authentication
- CRUD operations for journal entries
- SQLite database
- Sentiment analysis using NLTK
- Fully tested with pytest + GitHub Actions CI

### React Frontend
- Responsive UI built with React
- Integrated frontend-backend communication
- Easy development setup with Docker

### CI/CD & Containerization
- Dockerized backend + frontend
- docker-compose for local development
- Automated test pipeline triggered on every push/PR
- Installed and configured Python + Node in CI
- Automated NLTK data downloads for test environment

### 🚀 Tech Stack
- Backend: Python, FastAPI, JWT Auth, Passlib, HTTPX, SQLite
- Frontend: React, JavaScript, Fetch API
- Testing: Pytest, pytest-asyncio
- DevOps: Docker, docker-compose, GitHub Actions