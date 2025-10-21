import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { Eye, EyeOff, User, Mail, Lock, Phone, MapPin } from "lucide-react";

const Login = ({ onToggleMode }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await login(formData.email, formData.password);

    if (result.success) {
      toast.success("Login successful!");
    } else {
      toast.error(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="auth-form">
      <h2>Login to Your Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <Mail className="input-icon" />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <Lock className="input-icon" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button type="submit" disabled={loading} className="auth-button">
          {loading ? <ClipLoader size={20} color="#fff" /> : "Login"}
        </button>
      </form>

      <p className="auth-toggle">
        Don't have an account?{" "}
        <button onClick={onToggleMode} className="toggle-link">
          Register here
        </button>
      </p>
    </div>
  );
};

const Register = ({ onToggleMode }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await register(formData);

    if (result.success) {
      toast.success("Registration successful!");
    } else {
      toast.error(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="auth-form">
      <h2>Create Your Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <User className="input-icon" />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <Mail className="input-icon" />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <Lock className="input-icon" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className="input-group">
          <Phone className="input-icon" />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <MapPin className="input-icon" />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={loading} className="auth-button">
          {loading ? <ClipLoader size={20} color="#fff" /> : "Register"}
        </button>
      </form>

      <p className="auth-toggle">
        Already have an account?{" "}
        <button onClick={onToggleMode} className="toggle-link">
          Login here
        </button>
      </p>
    </div>
  );
};

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        {isLogin ? (
          <Login onToggleMode={() => setIsLogin(false)} />
        ) : (
          <Register onToggleMode={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
};

export default AuthModal;
