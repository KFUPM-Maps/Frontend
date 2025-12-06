export default function ProgressBar({ value, max }) {
  return (
    <div className="w-full max-w-md min-h-2  bg-bg border rounded-full h-3 overflow-hidden">
      <div
        className="bg-success h-full"
        style={{ width: `${(value/max)*100}%` }}
      ></div>
    </div>
  );
}
