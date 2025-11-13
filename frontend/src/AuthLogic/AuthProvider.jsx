import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { refreshTokenRequest } from "../api/auth";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
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
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};
