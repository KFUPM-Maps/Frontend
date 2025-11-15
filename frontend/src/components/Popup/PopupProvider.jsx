import { useState, useCallback } from "react";
import { PopupContext } from "./PopupContext";
import Popup from "./Popup";

export default function PopupProvider({ children }) {
  const [popup, setPopup] = useState(null);

  const showSuccess = useCallback((message, duration = 3000) => {
    setPopup({ type: "success", message, duration });
  }, []);

  const showError = useCallback((message, duration = 3000) => {
    setPopup({ type: "error", message, duration });
  }, []);

  const showConfirm = useCallback((message) => {
    return new Promise((resolve) => {
      setPopup({
        type: "confirm",
        message,
        resolve,
      });
    });
  }, []);

  const closePopup = (answer) => {
    if (popup?.type === "confirm") {
      popup.resolve(answer);      
    }
    setPopup(null);
  };

  return (
    <PopupContext.Provider value={{ showSuccess, showError, showConfirm }}>
      {children}
      {popup && (
        <Popup
          type={popup.type}
          message={popup.message}
          duration={popup.duration}
          onClose={closePopup}
        />
      )}
    </PopupContext.Provider>
  );
}
