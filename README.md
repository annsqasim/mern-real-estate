# 🏠 MERN Real Estate App

A full-stack **MERN application** for managing real estate properties.  
This assessment demonstrates my ability to build a production-ready frontend with React, Redux, and Material-UI, and connect it to a Node.js + Express backend with MongoDB.  

---

## 🚀 Features

### Frontend
- ⚛️ Built with **React** (Vite/CRA) + **Redux Toolkit**
- 🎨 Styled with **Material-UI (MUI)**
- 📱 Fully responsive (mobile + desktop)
- 🔍 Property listing with:
  - Sidebar filters (type, location, price range)
  - Pagination
- 📝 Add new property form
- 📄 Property detail page
- 🗂 Dashboard layout with navigation

### Backend
- 🌐 Node.js + Express REST API
- 🗄 MongoDB with Mongoose ODM
- 📌 Endpoints:
  - `GET /api/properties` → list properties with filters + pagination
  - `POST /api/properties` → create a new property
  - `GET /api/properties/:id` → get property by ID
- 🔑 CORS-enabled for frontend communication
- 🧪 Seed script to populate demo data

---

## 📦 Tech Stack

- **Frontend:** React, Redux Toolkit, React Router, Material-UI
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB
- **Dev Tools:** Nodemon, dotenv, concurrently

---

## 🛠 Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/mern-real-estate.git
cd mern-real-estate
```

### 2. Backend Setup

```bash
cd backend
npm install
```

## Create .env file in backend/:

```bash
PORT=8000
MONGO_URI=mongodb://127.0.0.1:27017/realestate
```

## Run backend:

```bash
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm start
```

## App runs on:

# Frontend → http://localhost:3000
# Backend → http://localhost:8000


🌱 Seed Database

```bash
cd backend
node src/seed.js
```

mern-real-estate/
│
├── backend/
│   ├── models/         # Mongoose models
│   ├── routes/         # Express routes
│   ├── controllers/    # Route controllers
│   ├── seed.js         # Demo data seeder
│   └── server.js       # App entry point
│
├── frontend/
│   ├── src/
│   │   ├── pages/      # Page components (List, Detail, Create, Dashboard)
│   │   ├── components/ # Reusable UI components
│   │   ├── store/      # Redux Toolkit slices
│   │   └── App.js      # Routes
│   └── package.json
│
└── README.md

👤 Author
Muhammad Anns Bin Qasim
Frontend Engineer | React.js | MERN Stack Developer