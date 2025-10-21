import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import {
  Users,
  Mail,
  Activity,
  Calendar,
  TrendingUp,
  UserCheck,
  UserX,
  Eye,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentContacts, setRecentContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/dashboard/stats");
      setStats(res.data.stats);
      setRecentUsers(res.data.recentUsers);
      setRecentContacts(res.data.recentContacts);
    } catch (error) {
      toast.error("Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const updateContactStatus = async (contactId, status) => {
    try {
      await axios.put(`http://localhost:4000/api/contacts/${contactId}`, { status });
      toast.success("Contact status updated");
      fetchDashboardData();
    } catch (error) {
      toast.error("Failed to update contact status");
    }
  };

  const membershipData = [
    { name: "Basic", value: 45, color: "#8884d8" },
    { name: "Premium", value: 30, color: "#82ca9d" },
    { name: "VIP", value: 25, color: "#ffc658" },
  ];

  const monthlyData = [
    { month: "Jan", users: 20 },
    { month: "Feb", users: 35 },
    { month: "Mar", users: 45 },
    { month: "Apr", users: 60 },
    { month: "May", users: 75 },
    { month: "Jun", users: 90 },
  ];

  if (loading) {
    return (
      <div className="dashboard-loading">
        <ClipLoader size={50} color="#333" />
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome to the gym management system</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Users />
          </div>
          <div className="stat-content">
            <h3>{stats?.totalUsers || 0}</h3>
            <p>Total Users</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <UserCheck />
          </div>
          <div className="stat-content">
            <h3>{stats?.activeUsers || 0}</h3>
            <p>Active Users</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Mail />
          </div>
          <div className="stat-content">
            <h3>{stats?.totalContacts || 0}</h3>
            <p>Total Contacts</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Activity />
          </div>
          <div className="stat-content">
            <h3>{stats?.totalSessions || 0}</h3>
            <p>Workout Sessions</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="chart-card">
          <h3>Monthly User Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Membership Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={membershipData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {membershipData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Data */}
      <div className="recent-data-grid">
        <div className="recent-card">
          <h3>Recent Users</h3>
          <div className="recent-list">
            {recentUsers.map((user) => (
              <div key={user._id} className="recent-item">
                <div className="user-info">
                  <h4>{user.name}</h4>
                  <p>{user.email}</p>
                </div>
                <span className={`membership-badge ${user.membershipType}`}>
                  {user.membershipType}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="recent-card">
          <h3>Recent Contacts</h3>
          <div className="recent-list">
            {recentContacts.map((contact) => (
              <div key={contact._id} className="recent-item">
                <div className="contact-info">
                  <h4>{contact.name}</h4>
                  <p>{contact.email}</p>
                  <p className="contact-message">{contact.message}</p>
                </div>
                <div className="contact-actions">
                  <span className={`status-badge ${contact.status}`}>
                    {contact.status}
                  </span>
                  <div className="action-buttons">
                    <button
                      onClick={() => updateContactStatus(contact._id, "read")}
                      className="action-btn read"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => updateContactStatus(contact._id, "replied")}
                      className="action-btn replied"
                    >
                      <CheckCircle size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
