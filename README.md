# 🧠 TaskFlow – Smart Task Management System

> A modern full-stack task management application designed to help users organize, prioritize, and track their work efficiently.

---

## ✨ Features

- 🔐 **User Authentication** — Secure login system using JWT  
- 📝 **Create, Edit, Delete Tasks**  
- 🏷️ **Priority Management** — Low, Medium, High  
- 🔄 **Task Status Control** — Mark tasks as Pending / Completed  
- 📅 **Due Date Tracking**  
- 📂 **Detailed Task View Page**  
- 🧭 **Pagination for Task Lists**  
- 🎨 **Clean Modern UI** built with Tailwind CSS  
- ⚡ **Real-time Updates** without page reloads  

---

## 🛠️ Tech Stack

### Frontend
- React.js  
- Tailwind CSS  
- Axios  
- React Router DOM  
- Lucide Icons  

### Backend
- Node.js  
- Express.js  
- MongoDB  
- JWT Authentication  

---

## 🖥️ Project Preview

A beautifully designed dashboard that allows users to:

- Add tasks instantly  
- Organize tasks by priority  
- View detailed task information  
- Edit tasks seamlessly  

*(Add screenshots or demo video here)*

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/taskflow.git
cd taskflow
```
### 2️⃣ Setup Backend
```bash
cd backend
npm install
npm start
```
### 3️⃣ Setup Frontend
```bash
cd frontend
npm install
npm start
```
The app will run at:
```bash
http://localhost:3000
```

## 🖥️ API Overview
| Method | Endpoint              | Description        |
| ------ | --------------------- | ------------------ |
| POST   | /api/auth/login       | Login user         |
| GET    | /api/tasks            | Fetch all tasks    |
| POST   | /api/tasks            | Create new task    |
| PUT    | /api/tasks/:id        | Update task        |
| PATCH  | /api/tasks/:id/status | Toggle task status |
| DELETE | /api/tasks/:id        | Delete task        |
