import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="flex h-full items-center bg-bg-dark justify-center ">
        <div className="flex flex-col w-3/4 md:w-1/2 items-center p-10 gap-6 bg-linear-to-t from-bg to-bg-light border-1 border-t-highlight border-border-muted rounded-lg">
            <h1 className="font-extrabold text-text">KFUPM Maps</h1>
            <Outlet />
        </div>
    </div>
    );
};

export default AuthLayout;