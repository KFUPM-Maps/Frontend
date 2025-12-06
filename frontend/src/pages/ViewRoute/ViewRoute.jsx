import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router"
import { usePopup } from "../../components/Popup/PopupContext";
import { getRouteRequest } from "../../api/routes";
import ProgressBar from "./ProgressBar";
import ImageCarousel from "./ImageCarousel";
import { useLocation } from "react-router";
import { AuthContext } from "../../AuthLogic/AuthContext";
import { likeRouteRequest } from "../../api/route";

export default function ViewRoute({preview = false}){
    const {id} = useParams();
    const popup = usePopup();
    const {user} = useContext(AuthContext);
    const location = useLocation()
    const [route, setRoute] = useState({});
    const [images, setImages] = useState([]);
    const [caption, setCaption] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(()=>{
        const fetchData = async ()=>{
            let res = await getRouteRequest(id);
            if(res.success){
                setRoute(res.data)
            }
            else{
                popup.showError("Request failed: " + res.error);
            }
        }
        if(!preview)
            fetchData()
        else
            setRoute(location.state)
    }, [])

    useEffect(()=>{
        setImages(route.steps?route.steps.reduce((acc, s) => [...acc, s.photo], []):[]);
    }, [route])

    useEffect(()=>{
        setCaption(route.steps?route.steps[index].caption:"")
    }, [index, route])

    const handelLike = () =>{
        if(!user){
            popup.showError("You must be logged in to like a route.");
            return;
        }
        const fetchData = async ()=>{
            let res = await likeRouteRequest(id, user.id);
            if(res.success){
                setRoute({
                    ...route,
                    islikedByUser: !route.islikedByUser
                })
            }
            else{
                popup.showError("Request failed: " + res.error);
            }
        }
        fetchData();
    }
    

    return (
    <div className="flex flex-col p-4 py-10 sm:py-5 gap-2 items-center h-full w-full overflow-y-auto"> 
        <div className="flex justify-start items-baseline gap-2 w-1/2 max-w-md">
            <span className="text-3xl">{route.title}</span>
            <span className="text-text-muted">from {route.firstBuilding} to {route.secondBuilding}</span>
        </div>
        <ProgressBar value={index + 1} max={images.length}/>
        <ImageCarousel
            images={images}
            index={index}
            setIndex={setIndex}
        />
            <div className="flex items-center justify-between w-full max-w-md">
                <span>{caption}</span>
                {!preview &&
                <i className="material-icons hover:text-primary select-none" onClick={handelLike}>{route.islikedByUser?"star":"star_border"}</i>
                }
            </div>
    </div>
    )
}