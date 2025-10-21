import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

// Clear any existing token on app start to prevent issues
const getInitialToken = () => {
  try {
    return localStorage.getItem("token");
  } catch (error) {
    console.log("Error reading token from localStorage:", error);
    return null;
  }
};

const initialState = {
  user: null,
  token: getInitialToken(),
  isAuthenticated: false,
  loading: true,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case "USER_LOADED":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case "AUTH_ERROR":
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Set up axios defaults
  useEffect(() => {
    if (state.token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${state.token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [state.token]);

  // Load user on app start
  useEffect(() => {
    const loadUser = async () => {
      if (state.token) {
        try {
          const res = await axios.get("http://localhost:4000/api/auth/me");
          dispatch({
            type: "USER_LOADED",
            payload: res.data.user,
          });
        } catch (error) {
          console.log("Auth error:", error.message);
          dispatch({ type: "AUTH_ERROR" });
        }
      } else {
        dispatch({ type: "AUTH_ERROR" });
      }
    };

    // Add a small delay to prevent immediate loading issues
    const timer = setTimeout(loadUser, 100);
    return () => clearTimeout(timer);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:4000/api/auth/login", {
        email,
        password,
      });

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data,
      });

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  const register = async (userData) => {
    try {
      const res = await axios.post("http://localhost:4000/api/auth/register", userData);

      dispatch({
        type: "REGISTER_SUCCESS",
        payload: res.data,
      });

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const updateProfile = async (profileData) => {
    try {
      const res = await axios.put("http://localhost:4000/api/auth/profile", profileData);
      dispatch({
        type: "USER_LOADED",
        payload: res.data.user,
      });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Profile update failed",
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
