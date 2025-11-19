import { useEffect, useState } from "react";
import { getAllRoutes } from "../../../api/routes";
import { usePopup } from "../../../components/Popup/PopupContext";
import { useOutletContext } from "react-router";
import RouteItem from "../../../components/Routes/RouteItem";
import Stars from "../../../components/Routes/Stars";

export default function ManageRoutes(){
    const [routes, setRoutes] = useState([]);
    const {type} = useOutletContext();
    const popup = usePopup();

    useEffect(()=>{
        const fetchData = async ()=>{
            let res = await getAllRoutes(type);
            if(res.success){
                setRoutes(res.data)
            }
            else{
                popup.showError("Request failed: " + res.error);
            }
        }
        fetchData()
    }, [type])



    return (
        <>
            {routes.map((r)=>{
                return <RouteItem key={r.id} route={r}>
                    <Stars route={r}/>
                </RouteItem>
            })}
        </>
    )
}