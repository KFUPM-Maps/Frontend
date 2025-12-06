import { useEffect } from "react";

export default function Popup({ 
  type = "success",
  message, 
  onClose,
  duration = 3000
}) {

  useEffect(() => {
    if (type !== "confirm") {
      const timer = setTimeout(() => onClose(), duration);
      return () => clearTimeout(timer);
    }
  }, [type, duration, onClose]);

  return (
    <div className={`
      fixed top-1 left-1/2 px-4 py-3 z-300 rounded-lg shadow-lg text-white
      ${type === "success" ? "bg-success" : ""}
      ${type === "error" ? "bg-danger" : ""}
      ${type === "confirm" ? "bg-info" : ""}
    `}>
      <p>{message}</p>

      {type === "confirm" && (
        <div className="flex gap-2 mt-3">
          <button 
            onClick={() => onClose(true)}
            className="bg-success text-text px-3 py-1 rounded hover:bg-success/80 "
          >
            Yes
          </button>
          <button 
            onClick={() => onClose(false)}
            className="bg-danger text-text px-3 py-1 rounded hover:bg-danger/80"
          >
            No
          </button>
        </div>
      )}
    </div>
  );
}
