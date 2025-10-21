# MERN Gym Website - Complete Setup Guide

## 🏋️‍♂️ Project Overview

This is a complete MERN (MongoDB, Express.js, React, Node.js) gym website with:
- **User Authentication** (Register/Login)
- **Admin Dashboard** with analytics
- **User Management** system
- **Contact Form** with email notifications
- **BMI Calculator**
- **Responsive Design**

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (free tier available)
- Git

### 1. Clone and Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd mern-gym-website

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Database Setup (MongoDB Atlas)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Get your connection string
4. Update `backend/config.env` with your MongoDB URI:

```env
MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.mongodb.net/gym-website?retryWrites=true&w=majority
```

### 3. Environment Configuration

Update `backend/config.env` with your settings:

```env
PORT=4000
FRONTEND_URL=http://localhost:5173

# MongoDB Atlas
MONGODB_URI=your-mongodb-connection-string

# JWT Secret (change this!)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345
JWT_EXPIRE=7d

# Email Configuration (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SERVICE=gmail
SMTP_MAIL=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

### 4. Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 5. Access the Application

- **Main Website**: http://localhost:5173
- **Admin Dashboard**: http://localhost:5173/dashboard

## 👤 Default Admin Account

After starting the application, you can create an admin user by:

1. Register a new account through the website
2. Or manually create one in the database with `role: "admin"`

**Test Admin Credentials:**
- Email: `admin@gym.com`
- Password: `admin123`
- Role: `admin`

## 🎯 Features

### For Users:
- ✅ User Registration & Login
- ✅ Profile Management
- ✅ BMI Calculator
- ✅ Contact Form
- ✅ Responsive Design

### For Admins:
- ✅ Dashboard with Analytics
- ✅ User Management
- ✅ Contact Management
- ✅ Membership Management
- ✅ Real-time Statistics

## 📁 Project Structure

```
mern-gym-website/
├── backend/
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Authentication middleware
│   ├── utils/           # Helper functions
│   └── app.js           # Main server file
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── context/     # React context (Auth)
│   │   └── App.jsx     # Main app component
│   └── public/          # Static assets
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Admin Routes
- `GET /api/dashboard/stats` - Dashboard statistics
- `GET /api/users` - Get all users
- `PUT /api/users/:id/membership` - Update user membership
- `GET /api/contacts` - Get all contacts
- `PUT /api/contacts/:id` - Update contact status

### General Routes
- `POST /api/contact` - Submit contact form
- `POST /api/workout-sessions` - Log workout session
- `GET /api/workout-sessions` - Get user's sessions

## 🎨 Customization

### Styling
- Main styles: `frontend/src/App.css`
- Component-specific styles included in CSS
- Responsive design included

### Adding Features
1. Create new models in `backend/models/`
2. Add routes in `backend/routes/`
3. Create React components in `frontend/src/components/`
4. Update navigation in `Navbar.jsx`

## 🚨 Troubleshooting

### Common Issues:

1. **MongoDB Connection Error**
   - Check your MongoDB Atlas connection string
   - Ensure your IP is whitelisted in Atlas
   - Verify network access settings

2. **Port Already in Use**
   - Change PORT in `config.env`
   - Kill existing processes: `npx kill-port 4000`

3. **CORS Errors**
   - Check frontend URL in backend CORS settings
   - Ensure both servers are running

4. **Authentication Issues**
   - Check JWT_SECRET in config.env
   - Verify token in browser localStorage

## 📱 Mobile Responsive

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- CORS protection
- Input validation
- Protected admin routes

## 📈 Performance

- Optimized React components
- Efficient database queries
- Responsive images
- Lazy loading where applicable

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🆘 Support

If you encounter any issues:
1. Check the troubleshooting section
2. Review the console logs
3. Ensure all dependencies are installed
4. Verify environment variables

---

**Happy Coding! 🏋️‍♂️💪**