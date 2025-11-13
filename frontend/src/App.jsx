import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./Layout.jsx";
import Home from "./pages/Home/Home.jsx";
import { useAxiosSetup } from "./AuthLogic/useAxiosSetup.jsx";
import AuthLayout from "./pages/Auth/AuthLayout.jsx";
import Login from "./pages/Auth/Login/Login.jsx";
import Signup from "./pages/Auth/Signup/Signup.jsx";
import "./styles.css";

function App() {
  //useAxiosSetup();
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        {/* <Route
          path="/anyProtectedRoute"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        /> */}
        <Route path="*" element={<div>404 Not Found</div>} />

      </Route>
    </Routes>
  );
}

export default App;
