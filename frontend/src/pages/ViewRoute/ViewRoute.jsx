import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { usePopup } from "../../components/Popup/PopupContext";
import { getRouteRequest } from "../../api/routes";
import ProgressBar from "./ProgressBar";
import ImageCarousel from "./ImageCarousel";

export default function ViewRoute(){
    const {id} = useParams();
    const popup = usePopup();
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
        fetchData()
    }, [])

    useEffect(()=>{
        setImages(Object.values(route.steps?route.steps:{}).reduce((acc, s) => [...acc, s.photo], []));
    }, [route])

    useEffect(()=>{
        setCaption(route.steps?route.steps[String(index + 1)].caption:"")
    }, [index, route])
    

    return (
    <div className="flex flex-col p-4 py-10 sm:py-5 gap-2 items-center h-full w-full"> 
        <div className="flex justify-center items-baseline gap-2 w-full">
            <span className="text-3xl">{route.title}</span>
            <span className="text-text-muted">from {route.firstBuilding} to {route.secondBuilding}</span>
        </div>
        <ProgressBar value={index + 1} max={images.length}/>
        <ImageCarousel
            images={images}
            index={index}
            setIndex={setIndex}
        />
        <span>{caption}</span>
    </div>
    )
}