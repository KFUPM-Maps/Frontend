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
      fixed top-4 left-4 px-4 py-3 rounded-lg shadow-lg text-white
      ${type === "success" ? "bg-success" : ""}
      ${type === "error" ? "bg-danger" : ""}
      ${type === "confirm" ? "bg-info" : ""}
    `}>
      <p>{message}</p>

      {type === "confirm" && (
        <div className="flex gap-2 mt-3">
          <button 
            onClick={() => onClose("yes")}
            className="bg-success text-text px-3 py-1 rounded "
          >
            Yes
          </button>
          <button 
            onClick={() => onClose("no")}
            className="bg-danger text-text px-3 py-1 rounded"
          >
            No
          </button>
        </div>
      )}
    </div>
  );
}
