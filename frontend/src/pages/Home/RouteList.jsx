import { useContext, useEffect, useState } from "react";
import { getRoutesRequest } from "../../api/routes";
import { usePopup } from "../../components/Popup/PopupContext";
import {AuthContext} from "../../AuthLogic/AuthContext"
import RouteItem from "../../components/Routes/RouteItem";
import Likes from "../../components/Routes/Stars";

export default function RouteList({firstBuilding, secondBuilding}){
    const [routes, setRoutes] = useState([]);
    const popup = usePopup();
    const user = useContext(AuthContext)

    useEffect(()=>{
        const fetchData = async ()=>{
            let res = await getRoutesRequest();
            if(res.success){
                setRoutes(res.data)
            }
            else{
                popup.showError("Request failed: " + res.error);
            }
        }
        fetchData()
    }, [firstBuilding, secondBuilding])

    const sortedRoutes = routes.sort((a, b) => b.starsCount - a.starsCount)

    return (
    <div className="absolute bottom-0 flex flex-col gap-4 left-1/2 -translate-x-1/2 bg-linear-to-t from-bg-dark to-bg border-1 border-border border-t-highlight w-10/12 h-3/4 p-4 md:w-3/4 rounded-t-xl slide-up">
        <div className="flex justify-between items-end">
            <h1 className="text-4xl">Routes</h1>
            <button className="bg-primary hover:bg-secondary rounded py-2 px-4" onClick={()=>{}}>
                Add Route
            </button>
        </div>
        <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
            {sortedRoutes.map((r)=>
            <RouteItem key={r.id} route={r}>
                <Likes route={r}/>
            </RouteItem>
            )}
        </div>
    </div>
    )
}