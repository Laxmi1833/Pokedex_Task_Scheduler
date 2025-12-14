# 🧿 Pokédex Task Scheduler — Trainer Mission Manager

A Pokémon-themed task management web application that helps trainers organize, track, and complete their daily missions — just like a real Pokédex.

---

## 🎯 Problem Statement

Every Pokémon Trainer has daily missions to manage — training Pokémon, catching new ones, and challenging gyms.  
Keeping track of these missions manually can be inefficient and error-prone.

The **Pokédex Task Scheduler** solves this by providing a centralized, themed task management system where trainers can manage their missions and receive timely reminders.

---

## 🚀 Features

### 🔐 User Authentication
- Secure trainer login using JWT authentication
- Each trainer has access only to their own missions

### 📝 Mission Management
- Create, edit, and delete trainer missions
- Each mission includes:
  - **Title**
  - **Description**
  - **Deadline**
  - **Priority Level**
    - 🟢 Normal Mission
    - 🔵 Gym Mission
    - 🔴 Elite Mission

### ⏰ Background Job Scheduler
- Automated reminder system using cron jobs or background workers
- Sends notifications before mission deadlines

### 📩 Email / SMS Notifications
- Trainer alerts delivered via Email or SMS
- Notification UI styled like a Pokédex alert screen

---

## 🛠 Tech Stack

**Frontend**
- React + Vite
- Tailwind CSS
- Framer Motion

**Backend**
- Node.js
- Express.js
- PostgreSQL (Neon)
- JWT Authentication

---

## 🗄 Database Design

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trainer_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(100) NOT NULL,
  description TEXT,
  deadline DATE NOT NULL,
  priority VARCHAR(20) CHECK (priority IN ('NORMAL', 'GYM', 'ELITE')),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🚀 Getting Started

### Backend (Node.js)

```bash
cd server
npm install
npm run dev
```

Server runs on:
```
http://localhost:5000
```

### Frontend

```bash
cd client
npm install
npm run dev
```

Frontend runs on:
```
http://localhost:5173
```

---

## 🏆 Conclusion

The **Pokédex Task Scheduler** blends productivity with fun by combining task management with a Pokémon-themed experience.

**Gotta complete ’em all! ⚡**
