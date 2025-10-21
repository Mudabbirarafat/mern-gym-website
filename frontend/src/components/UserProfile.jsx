import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { User, Mail, Phone, MapPin, Save, LogOut } from "lucide-react";

const UserProfile = ({ isOpen, onClose }) => {
  const { user, updateProfile, logout } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await updateProfile(formData);

    if (result.success) {
      toast.success("Profile updated successfully!");
    } else {
      toast.error(result.message);
    }

    setLoading(false);
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    onClose();
  };

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

  // Don't render if not open
  if (!isOpen) return null;

  return (
    <div className="profile-modal-overlay" onClick={onClose}>
      <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        
        <div className="profile-header">
          <h2>User Profile</h2>
          <div className="user-info">
            <div className="user-avatar">
              <User size={40} />
            </div>
            <div className="user-details">
              <h3>{user?.name}</h3>
              <p>{user?.email}</p>
              <span className={`membership-badge ${user?.membershipType}`}>
                {user?.membershipType?.toUpperCase()} Member
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="profile-form">
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
              value={user?.email}
              disabled
              className="disabled-input"
            />
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

          <div className="profile-actions">
            <button type="submit" disabled={loading} className="save-button">
              {loading ? <ClipLoader size={18} color="#fff" /> : <Save size={18} />}
              Save Changes
            </button>
            
            <button type="button" onClick={handleLogout} className="logout-button">
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
