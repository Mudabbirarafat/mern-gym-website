🏋️‍♂️ Elite Edge Fitness – MERN Stack Gym Website
A modern full-stack fitness website built using MERN Stack (MongoDB, Express.js, React.js, Node.js) with Email Contact Functionality. Users can explore services, view pricing plans, and contact the gym directly via email.

🚀 Features
🖥️ Responsive React frontend with Vite

📧 Contact form with email functionality using NodeMailer + Gmail SMTP

🔐 Secure backend with CORS and dotenv

💳 Join Now buttons for future Razorpay integration (coming soon)

🎨 Fully styled with custom CSS and icons

📂 Tech Stack
Frontend	Backend	Email	Tools
React.js	Node.js + Express.js	Nodemailer (SMTP - Gmail)	Vite, dotenv, React Toastify

📬 Email Functionality
When a user submits the contact form:

An email is sent to your registered Gmail address.

Uses nodemailer with environment variables for secure SMTP setup.

⚙️ Setup Instructions
Clone the repo

bash
Copy
Edit
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
Frontend setup

bash
Copy
Edit
cd frontend
npm install
npm run dev
Backend setup

bash
Copy
Edit
cd ../backend
npm install
npm run dev
Create .env in backend

env
Copy
Edit
PORT=4000
FRONTEND_URL=http://localhost:5173
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SERVICE=gmail
SMTP_MAIL=yourEmail@gmail.com
SMTP_PASSWORD=yourAppPassword
⚠️ Use Gmail App Password if you have 2FA enabled.

Home page with hero section

Pricing plans

Contact form

Email alert via toast


🛠 Future Scope
Razorpay integration for payments

Admin dashboard for managing enquiries

MongoDB database for storing leads

🙋‍♂️ Author
Mohd Mudabbir Arafat
📍 Lucknow, Uttar Pradesh
🌐 GitHub