# 🗺️ KFUPM Maps – Frontend

**Course:** SWE 363 – Web Engineering & Development  
**Term:** 251  
**Team 03:** Youssef Abdelaziz, Khalid Aljohani, Abdulkader Alsamman, Mohammed Yar  

---

## 📖 Project Description

**KFUPM Maps** is a web-based indoor navigation application designed for the KFUPM campus.  
It provides **photo-based routes** rather than abstract lines on a digital map—helping students and visitors easily navigate complex indoor paths, parking connections, and multi-level buildings.

Each route is made of sequential photos with captions describing every step.  
Users can also contribute new routes, which are reviewed by admins before publication.  
A leaderboard and up-voting system encourage high-quality contributions and highlight the most helpful routes.

---

## 🎯 Motivation

Students and faculty often struggle to find the fastest indoor paths or shortcuts across campus.  
Traditional map apps fail to represent KFUPM’s multi-level layout and indoor connectivity.  
KFUPM Maps solves this by combining:
- **Real photos** of every step  
- **Community contributions** for continuous updates  
- **Admin moderation** to ensure accuracy  
- **Gamified engagement** via leaderboards and votes  

This improves way-finding, saves time, and offers a realistic, stress-free navigation experience.

---

## 👥 Target Users

| User Type | Description |
|------------|-------------|
| **Guest / Visitor** | Can browse buildings and view approved routes. |
| **Student (Registered User)** | Can sign up / log in, view and submit new routes (photos + captions), edit or delete their submissions, and vote on existing routes. |
| **Admin** | Can review and approve/reject submitted routes and manage content visibility. |

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React (Vite) + TailwindCSS (using `@theme` color tokens) |
| **Popup System** | Custom React Context for success/error/confirm messages |
| **Mock Backend (for frontend phase)** | `json-server` with `db.json` |
| **Routing** | `react-router` |
| **State / Auth** | React Context API (AuthContext) + localStorage tokens |

---

## 🧩 Key Features

1. **Interactive Campus Map** – Select start / destination buildings.  
2. **Photo-Based Route Viewer** – Step-by-step carousel with captions.  
3. **User Authentication** – Sign Up, Login, Logout (persistent session).  
4. **My Account Page** – Update profile info (first / last name & photo).  
5. **Route Submission** – Upload ordered photos and captions.  
6. **Leaderboard** – Ranks users by approved routes and votes.  
7. **Admin Moderation** – Approve or reject pending routes.  
8. **Popup Messages** – Consistent success / error feedback UI.

---

## 🖥️ Setup and Installation (Frontend Only)

### Prerequisites
- Node .js v18 or newer
- npm (v9 +)

### Installation
```bash
# 1 Navigate to the frontend folder
cd frontend

# 2 Install dependencies
npm install

# 3 run 
npm run dev 

# 4 run the server (in a separate terminal)
npm run server
