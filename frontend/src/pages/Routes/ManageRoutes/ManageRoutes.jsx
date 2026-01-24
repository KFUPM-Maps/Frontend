import { useEffect, useState } from "react";
import { getAllRoutes } from "../../../api/routes";
import { usePopup } from "../../../components/Popup/PopupContext";
import { useNavigate, useOutletContext } from "react-router";
import RouteItem from "../../../components/Routes/RouteItem";
import Stars from "../../../components/Routes/Stars";
import Loading from "../../../components/Loading.jsx";

export default function ManageRoutes(){
    const [routes, setRoutes] = useState([]);
    const {type} = useOutletContext();
    const navigate = useNavigate();
    const popup = usePopup();
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchData = async ()=>{
            setLoading(true);
            let res = await getAllRoutes(type);
            if(res.success){
                setRoutes(res.data)
            }
            else{
                popup.showError("Request failed: " + res.error);
            }
            setLoading(false);
        }
        fetchData()
    }, [type])

    const handelManage = (e) =>{
        let id = e.target.closest('[id*="route"]').id.replace("route", "")
        navigate(`/manageroute/${id}`)
    }


    return (
        <>
            {loading ? <Loading/> :
            routes.length === 0 ? <span className="text-text-muted text-xl text-center mt-8">No routes available.</span> :
            routes.map((r)=>{
                return <RouteItem key={r.id} route={r} handelClick={handelManage}>
                    <Stars route={r}/>
                </RouteItem>
            })}
        </>
    )
}