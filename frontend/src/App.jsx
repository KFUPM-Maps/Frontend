import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return(   
  <BrowserRouter>
    <Routes>
      <Route index element={<Home />} />

      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Register />} />
      </Route>

    </Routes>

  </BrowserRouter>
  )
}

export default App
