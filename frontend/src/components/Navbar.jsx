import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { User, LogIn, Settings, BarChart3 } from "lucide-react";
import AuthModal from "./AuthModal";
import UserProfile from "./UserProfile";

const Navbar = () => {
  const { isAuthenticated, user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleAuthClick = () => {
    setShowAuthModal(true);
  };

  const handleProfileClick = () => {
    setShowProfile(true);
  };

  return (
    <>
      <header className="navbar">
        <div className="navbar-brand">
          <h1>ELITE EDGE FITNESS</h1>
        </div>
        
        <nav className="navbar-nav">
          <a href="#home">Home</a>
          <a href="#workouts">Workouts</a>
          <a href="#gallery">Gallery</a>
          <a href="#pricing">Pricing</a>
          <a href="#contact">Contact</a>
          <a href="#bmi">BMI Calculator</a>
        </nav>

        <div className="navbar-actions">
          {isAuthenticated ? (
            <div className="user-menu">
              <button className="user-button" onClick={handleProfileClick}>
                <User size={20} />
                <span>{user?.name}</span>
              </button>
              {user?.role === "admin" && (
                <a href="/dashboard" className="dashboard-link">
                  <BarChart3 size={20} />
                  Dashboard
                </a>
              )}
            </div>
          ) : (
            <button className="login-button" onClick={handleAuthClick}>
              <LogIn size={20} />
              Login
            </button>
          )}
        </div>
      </header>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      <UserProfile isOpen={showProfile} onClose={() => setShowProfile(false)} />
    </>
  );
};

export default Navbar;
