import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./Layout.jsx";
import Home from "./pages/Home/Home.jsx";
// import AuthLayout from "./layouts/AuthLayout.jsx";
// import Login from "./pages/Auth/Login.jsx";
// import Register from "./pages/Auth/Register.jsx";

function App() {
  return(   
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        {/* <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Register />} />
        </Route> */}
      </Route>
    </Routes>

  </BrowserRouter>
  )
}

export default App
