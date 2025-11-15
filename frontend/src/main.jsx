import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "./AuthLogic/AuthProvider.jsx";
import  PopupProvider  from "./components/Popup/PopupProvider.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PopupProvider>
          <App />
        </PopupProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
