import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./Layout.jsx";
import Home from "./pages/Home/Home.jsx";
import { useAxiosSetup } from "./AuthLogic/useAxiosSetup.jsx";
import AuthLayout from "./pages/Auth/AuthLayout.jsx";
import ProtectedRoute from "./AuthLogic/ProtectedRouteLayout.jsx";
import Login from "./pages/Auth/Login/Login.jsx";
import Signup from "./pages/Auth/Signup/Signup.jsx";
import Logout from "./pages/Auth/Logout.jsx";
import Leaderboard from "./pages/Leaderboard/Leaderboard.jsx";
import Myaccount from "./pages/Myaccount/Myaccount.jsx";
import "./styles.css";
import RouteLayout from "./pages/Routes/RouteLayout.jsx";
import MyRoutes from "./pages/Routes/MyRoutes/MyRoutes.jsx";
import ManageRoutes from "./pages/Routes/ManageRoutes/ManageRoutes.jsx";
function App() {
  //useAxiosSetup();
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="logout" element={<Logout />} />
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route path="leaderboard" element={<Leaderboard/>}/> 
        <Route element= {<ProtectedRoute />}>
          {/* Protected routes go here */}
          <Route path="myaccount" element={<Myaccount />} />
          <Route element={<RouteLayout/>}>
            <Route path="myroutes" element={<MyRoutes/>}/>
            <Route path="manageroutes" element={<ManageRoutes/>}/>
          </Route>
        </Route>
        <Route path="*" element={<div className="flex justify-center items-center h-full" ><h1 className="font-extrabold text-danger m-2">404 Not Found</h1></div>} />
      </Route>
    </Routes>
  );
}

export default App;
