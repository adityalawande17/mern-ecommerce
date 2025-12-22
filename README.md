# 🛒 MERN E‑Commerce Store

A full‑stack e‑commerce web application built with the MERN stack (MongoDB, Express, React, Node) featuring cart, wishlist, product reviews, authentication, and dark mode.

## 🚀 Tech Stack

- Frontend: React, Context API, Axios
- Backend: Node.js, Express, MongoDB, Mongoose
- Auth: JWT-based login and registration

## ▶️ How to Run Locally

### 1. Clone the repository

git clone https://github.com/adityalawande17/mern-ecommerce.git
cd mern-ecommerce

### 2. Install dependencies

**Server:**
cd server
npm install

**Client:**
cd ../client
npm install

### 3. Environment variables

Create a `.env` file inside the `server` folder:

MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_secret_key_here
PORT=5000

### 4. Run the app

**Server:**
cd server
npm start

**Client:**
cd client
npm start

Then open http://localhost:3000 in your browser.
