import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "./AuthContext";
import { logoutRequest } from "../api/auth.js";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [accessToken, setAccessToken] = useState(() => {
    const saved = localStorage.getItem("accessToken");
    return saved ?? null;
  });

  const navigate = useNavigate();

  const login = (user, token) => {
    setUser(user);
    setAccessToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("accessToken", token);
  };

  const logout = async () => {
    let req = await logoutRequest();
    if (!req.success) {
      console.error("Logout failed:", req.error);
    } else {
      setUser(null);
      setAccessToken(null);
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      navigate("/");
    }
  };

  const updateUser = (newUser) => {
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  }

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    } else {
      localStorage.removeItem("accessToken");
    }
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        user,
        updateUser,
        accessToken,
        login,
        logout,
        setAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
