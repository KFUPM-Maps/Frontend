import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./Layout.jsx";
import Home from "./pages/Home/Home.jsx";
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
import ViewRoute from "./pages/ViewRoute/ViewRoute.jsx";
import ManageRoute from "./pages/ManageRoute/ManageRoute.jsx"

function App() {
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
        <Route path="viewroute/:id" element = {<ViewRoute/>}/>
        <Route element= {<ProtectedRoute />}>
          {/* Protected routes go here */}
          <Route path="myaccount" element={<Myaccount />} />
          <Route element={<RouteLayout/>}>
            <Route path="myroutes" element={<MyRoutes/>}/>
            <Route path="manageroutes" element={<ManageRoutes/>}/>
          </Route>
            <Route path="addroute/:firstBuilding/:secondBuilding" element={<ManageRoute updateRoute={false}/>}/>
            <Route path="updateroute/:id" element={<ManageRoute updateRoute={true}/>}/>
            <Route path="manageroute/:id" element={<ManageRoute manageRoute={true} />}/>
            <Route path="previewroute" element = {<ViewRoute preview = {true}/>}/>
        </Route>
        <Route path="*" element={<div className="flex justify-center items-center h-full" ><h1 className="font-extrabold text-danger m-2">404 Not Found</h1></div>} />
      </Route>
    </Routes>
  );
}

export default App;
