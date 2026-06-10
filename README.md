# 🚀 AI Resume Builder & Analyzer

An AI-powered Resume Analysis Platform that helps users evaluate and improve their resumes through ATS scoring, AI-generated insights, skill gap analysis, and resume history tracking.

---

## 📌 Features

### 📄 Resume Upload
- Upload resumes in PDF format
- Extracts resume text automatically

### 🎯 ATS Score Analysis
- Calculates ATS compatibility score
- Highlights resume strengths and weaknesses

### 🤖 AI Resume Analysis
- AI-generated feedback and recommendations
- Professional resume improvement suggestions

### 🧠 Skill Gap Detection
- Detects existing technical skills
- Identifies missing skills for better job matching

### 📜 Analysis History
- Stores previous resume analyses
- View ATS scores and summaries anytime

### 🔐 Authentication
- User Registration
- User Login
- JWT-based Authentication

---

## 🛠️ Tech Stack

### Frontend
- React.js
- TypeScript
- Vite
- Tailwind CSS
- Axios
- React Circular Progressbar

### Backend
- Node.js
- Express.js
- Multer
- PDF-Parse
- JWT Authentication

### Database
- MongoDB Atlas
- Mongoose

### AI Integration
- Gemini API

### Deployment
- Vercel
- Render
- MongoDB Atlas

---

## 📂 Project Structure

```bash
ai-resume-builder/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── routes/
│   ├── models/
│   ├── config/
│   ├── services/
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone <repository-url>

cd ai-resume-builder
```

### Frontend Setup

```bash
cd client

npm install

npm run dev
```

### Backend Setup

```bash
cd server

npm install

npm start
```

---

## 🔑 Environment Variables

Create a `.env` file inside the server folder.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_api_key
```

---

## 📸 Screenshots

<img width="1637" height="896" alt="image" src="https://github.com/user-attachments/assets/4b2f4011-4b17-4c1d-8aeb-49a5a54ed5af" />
<img width="1907" height="907" alt="image" src="https://github.com/user-attachments/assets/108cae99-ec05-434e-9077-4be28f96d305" />


---

## 🚀 Future Enhancements

- Resume Template Generator
- Job Description Matching
- Resume Download as PDF
- Recruiter Dashboard
- Advanced ATS Scoring Engine
- Multi-Resume Comparison

---

## 👨‍💻 Author

**Rajat Chitransh**

Full Stack Developer

---

## ⭐ Support

If you found this project useful, consider giving it a star on GitHub.
