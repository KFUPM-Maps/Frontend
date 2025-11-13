import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center gap-6 bg-amber-100 p-10 rounded-lg shadow-lg">
            <h1 className="font-extrabold">KFUPM Maps</h1>
            <Outlet />
        </div>
    </div>
    );
};

export default AuthLayout;