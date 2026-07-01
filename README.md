# AI Interview Platform

A comprehensive, AI-powered interview preparation platform designed to help candidates practice and refine their interviewing skills. The platform leverages Generative AI to generate role-specific questions, conducts interactive real-time interview sessions, and provides detailed automated evaluation and feedback.

## Key Features

- **Personalized Questions**: Generates tailored interview questions based on the candidate's uploaded resume, job title, and job description.
- **Real-Time Interactive AI**: Conducts the interview dynamically, asking one question at a time with integrated text-to-speech AI voices.
- **Flexible Controls**: Allows candidates to naturally progress, skip questions, or end the interview early if needed.
- **Detailed Evaluation**: Generates a comprehensive feedback report post-interview, detailing performance metrics, strengths, areas for improvement, and an overall summary.

## Tech Stack

- **Backend:** FastAPI (Python)
- **Frontend:** ReactJS
- **AI Engine:** Google Gemini
- **Deployment:** Docker & Docker Compose

## Prerequisites

Before setting up the project locally, ensure you have the following installed:
- Python 3.8+
- Node.js (v14 or higher)
- Docker & Docker Compose (optional, for containerized setup)

## Getting Started

### 1. Environment Configuration

You will need a Google Gemini API key to power the AI. Create a `.env` file in the root of the `backend` directory with the following:
```env
GEMINI_API_KEY=your_api_key_here
```

### 2. Running via Docker (Recommended)

To launch the complete application stack (frontend and backend) using Docker Compose, run the following from the project root:
```bash
docker compose up -d
```

### 3. Running Manually

If you prefer to run the services manually without Docker:

**Start the Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
fastapi dev main.py
```

**Start the Frontend:**
```bash
cd frontend
npm install
npm start
```

## Accessing the Application

Once the services are running, you can access them via your browser:
- **Frontend UI:** [http://localhost:3000](http://localhost:3000)
- **Backend API (Swagger Docs):** [http://localhost:8000/docs](http://localhost:8000/docs)
