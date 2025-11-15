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

  useEffect(()=>{
    const storageUser = localStorage.getItem("user")
    const storageToken = localStorage.getItem("accessToken")
    if(storageUser){
      setUser(JSON.parse(storageUser))
    }
    if(storageToken){
      setAccessToken(storageToken)
    }
  }, [])

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
