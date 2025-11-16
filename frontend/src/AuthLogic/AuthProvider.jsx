import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { refreshTokenRequest } from "../api/auth";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const [accessToken, setAccessToken] = useState(() => {
    const saved = localStorage.getItem("accessToken");
    return saved ? JSON.parse(saved) : null;
  });
  const navigate = useNavigate();

  // useEffect(() => {
  //   const tryRefresh = async () => {
  //     try {
  //       const data = await refreshTokenRequest();
  //       setAccessToken(data.accessToken);
  //       setUser(data.user);
  //     } catch {
  //       setUser(null);
  //     }
  //   };
  //   tryRefresh();
  // }, []);

  const login = (user, token) => {
    setUser(user);
    setAccessToken(token);
    localStorage.setItem("user", JSON.stringify(user))
    localStorage.setItem("accessToken", token)
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("user")
    localStorage.removeItem("accessToken")
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};
