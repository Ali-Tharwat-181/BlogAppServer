# 🛠️ Blog App – Back-End API

This is the back-end API for the **Blog App**, built using **Node.js**, **Express**, and **MongoDB**. It supports full CRUD operations for blog posts and user authentication.

---

## 🌐 Live API URL

https://blog-app-server-roan-xi.vercel.app/


---

## 🚀 Features

- 🔐 User authentication (signup/login)
- 🔐 JWT token support with cookie-based auth
- 📝 Create, Read, Update, Delete blog posts
- 🧑 Post ownership tracking (`createdBy`)
- 🔗 CORS support for frontend communication

---

## 🧰 Tech Stack

- **Node.js** + **Express**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **dotenv** for environment variables
- **CORS**, **morgan**
- **Deployed on**: Vercel 

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/blog-backend.git
cd blog-backend

2. Install Dependencies
npm install

3. Configure Environment Variables
Create a .env file in the root:


PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:5173

4. Start the Server

npm start
Server runs at: http://localhost:3000
