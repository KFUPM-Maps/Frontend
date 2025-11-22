import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router"
import { usePopup } from "../../../components/Popup/PopupContext"
import { getUserRoutes } from "../../../api/routes";
import RouteItem from "../../../components/Routes/RouteItem"
import Stars from "../../../components/Routes/Stars"
import { deleteRouteRequest } from "../../../api/routes";

export default function MyRoutes(){
    const [routes, setRoutes] = useState([]);
    const {type} = useOutletContext();
    const popup = usePopup();
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchData = async ()=>{
            let res = await getUserRoutes(type);
            if(res.success){
                setRoutes(res.data)
            }
            else{
                popup.showError("Request failed: " + res.error);
            }
        }
        fetchData()
    }, [type])

    const handelDelete = (e)=>{
        const deleteRequest = async ()=>{
            let id = e.target.closest('[id*="route"]').id.replace("route", "");
            let res = await deleteRouteRequest(id);
            if(res.success){
                let newRoutes = routes.filter(r => r.id !== id)
                setRoutes(newRoutes)
            }
            else{
                popup.showError("Delete request failed: " + res.error);
            }
        }
        deleteRequest()
    }

    const handelUpdate = (e) =>{
        let id = e.target.closest('[id*="route"]').id.replace("route", "")
        navigate(`/updateroute/${id}`)
    }

    return (
        <>
            {routes.map((r)=>{
                return <RouteItem key={r.id} route={r} handelClick={handelUpdate}>
                    <button className="flex items-center justify-center">
                        <span
                        className="material-symbols-rounded w-12  bg-danger rounded-2xl"
                        onClick={handelDelete}
                        >
                            close
                        </span>
                    </button>
                    <Stars route={r}/>
                </RouteItem>
            })}
        </>
    )
}