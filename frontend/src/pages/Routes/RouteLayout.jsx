import { Outlet } from "react-router";
import RouteHeader from "./RouteHeader";
import { useState } from "react";

export default function RouteLayout(){
    const [type, setType] = useState("Pending");

    return (
    <div className="px-2 w-full flex flex-col gap-2 items-center">
        <RouteHeader type={type} setType={setType}/>
        <div className="flex flex-col gap-2 flex-1 w-10/12 overflow-y-auto">
            <Outlet context={{type}}/>
        </div>
    </div>)
}