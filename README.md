# 🏋️‍♂️ Elite Edge Fitness – MERN Stack Gym Website

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)  
[![Frontend](https://img.shields.io/badge/Frontend-React-blue)](#)  
[![Backend](https://img.shields.io/badge/Backend-Node.js-green)](#)  
[![Nodemailer](https://img.shields.io/badge/Email-Nodemailer-orange)](#)

A modern full-stack fitness website built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js) featuring email contact functionality. Users can explore gym services, view pricing plans, and reach out via a contact form that sends email alerts.

---

## 🚀 Features

- Responsive React frontend built with Vite for speed and simplicity  
- Contact form with email notifications via Nodemailer + Gmail SMTP  
- Secure backend with CORS and dotenv for environment management  
- Join Now buttons prepared for future Razorpay payment integration  
- Custom CSS styling with icons for a polished user interface  
- Toast notifications for user feedback on form submissions  

---

## 📂 Tech Stack

| Frontend          | Backend             | Email                   | Tools                  |
|-------------------|---------------------|-------------------------|------------------------|
| React.js + Vite   | Node.js + Express   | Nodemailer (Gmail SMTP) | dotenv, React Toastify  |

---

## 📬 Email Functionality

- Sends email notification to your Gmail address when a user submits the contact form  
- Uses secure environment variables for SMTP credentials  
- Supports Gmail App Passwords for accounts with 2FA enabled  

---

## ⚙️ Setup Instructions
2. Frontend Setup
bash
Copy
Edit
cd frontend
npm install
npm run dev
3. Backend Setup
Open another terminal window/tab:

bash
Copy
Edit
cd backend
npm install
npm run dev
4. Configure Environment Variables
Create a .env file inside the backend folder with the following:

ini
Copy
Edit
PORT=4000
FRONTEND_URL=http://localhost:5173
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SERVICE=gmail
SMTP_MAIL=yourEmail@gmail.com
SMTP_PASSWORD=yourAppPassword
⚠️ Use Gmail App Password if your account has 2FA enabled.

🛠 Future Enhancements
Integrate Razorpay for online payments

Admin dashboard to manage enquiries

MongoDB database for storing leads and enquiries

### 1. Clone the repository

```bash
git clone https://github.com/Mudabbirarafat/mern-gym-website.git
cd mern-gym-website

###🧑‍💻 Author
Mohd Mudabbir Arafat
📍 Lucknow, Uttar Pradesh
https://github.com/dashboard
