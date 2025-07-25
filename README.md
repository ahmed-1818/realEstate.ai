 # 🏠 RealEstate.ai – Smart Real Estate Assistant

RealEstate.ai is an AI-powered chatbot platform that helps users find real estate listings, estimate property value, and answer housing-related queries using natural language. It’s built to streamline real estate browsing with intelligent, conversational search.

---

## 🚀 Features

- 🧠 ChatGPT-style real estate assistant
- 🏘️ Property listing search and filtering
- 📍 Location-aware suggestions (coming soon)
- 💬 Real-time human support (freelancer dashboard)
- 📊 Admin analytics and feedback system
- 🔍 RAG-based document retrieval (FAQs, policies, etc.)

---

## 🛠 Tech Stack

| Frontend | Backend | AI / NLP | Database | Realtime |
|----------|---------|----------|----------|----------|
| React.js | Flask / FastAPI | OpenAI / Groq + FAISS | Firebase / MongoDB | Firebase / WebSockets |

---

## 📂 Folder Structure
realestate-ai/
├── frontend/ # React Frontend
├── backend/ # Flask/FastAPI Backend
├── vectorstore/ # FAISS vector DB
└── README.md


---

## 🔧 How to Run (Development)

```bash
# Clone the repo
git clone https://github.com/your-username/realestate-ai.git
cd realestate-ai

# Install frontend (React)
cd frontend
npm install
npm run dev

# In new terminal - Run backend (Flask or FastAPI)
cd ../backend
pip install -r requirements.txt
python app.py


