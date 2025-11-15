import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "./AuthContext";

export default function ProtectedRoute() {
  const { user } = useContext(AuthContext);
  return user ? <Outlet /> : <Navigate to="/login" />;
}
