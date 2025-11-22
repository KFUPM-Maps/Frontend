import { useState, useEffect, useContext } from "react"
import { useNavigate, useParams } from "react-router"
import { usePopup } from "../../components/Popup/PopupContext";
import { getRouteRequest } from "../../api/routes";
import { AuthContext } from "../../AuthLogic/AuthContext";
import Steps from "./Steps";

export default function ManageRoute({updateRoute = false, manageRoute = false}){
    const {id, firstBuilding, secondBuilding} = useParams()
    const user = useContext(AuthContext)
    const popup = usePopup()
    const navigate = useNavigate()
    const [route, setRoute] = useState({
        id: -1,
        title: "",
        firstBuilding,
        secondBuilding,
        user: {
            firstName: user.firstName,
            lastName: user.lastName,
            picture: user.picture
        },
        steps: {
            "1": { "photo": "https://loremflickr.com/200/200/nature?random=2", "caption": "walk straight until you see the tall window" },
            "2": { "photo": "https://loremflickr.com/200/200/nature?random=3", "caption": "turn left near the small staircase" },
            "3": { "photo": "https://loremflickr.com/200/200/nature?random=4", "caption": "continue forward through the narrow hall" },
            "4": { "photo": "https://loremflickr.com/200/200/nature?random=5", "caption": "take the elevator to the second floor" }
        },
        islikedByUser: false,
    });

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
        if(updateRoute || manageRoute)
            fetchData()
    }, [id, updateRoute])

    const headerText = () =>{
        if(updateRoute)
            return "Update"
        if(manageRoute)
            return "Manage"
        return "Add"
    }


    const handelTitleChange = (e)=>{
        setRoute({
            ...route,
            title: e.target.value 
        })
    }

    const handelViewClick = (e)=>{
        navigate("/previewroute", {state:route}) 
    }

    return (
    <div className="flex justify-center items-center py-4 h-full">
        <div className="flex flex-col w-3/4 md:w-1/2 h-3/4 items-center p-10 gap-6 bg-linear-to-t from-bg to-bg-light border-1 border-t-highlight border-border rounded-lg">
            <h1 className="text-3xl">{headerText()} Route</h1>
            <div className="flex gap-2 w-full">
                <span>Route title:</span>
                <input className = "bg-bg border border-border flex-1 max-w-full" type="text" value={route.title} onChange={handelTitleChange}/>
            </div>
            <Steps route={route} setRoute={setRoute}/>
            <div className="flex flex-col  w-3/4 md:w-1/2 gap-2 items-center">
                <div className="flex justify-between gap-2 w-full">
                    <button className="bg-primary hover:bg-secondary rounded flex-1 py-2 px-4 max-w-1/2">Add step</button>   
                    <button className="bg-primary hover:bg-secondary flex-1 rounded py-2 px-4 max-w-1/2" onClick={handelViewClick}>preview</button>   
                </div>
                <div className="flex justify-between gap-2 w-full">
                    {
                        !manageRoute?
                        <button className="bg-success hover:bg-secondary rounded py-2 px-4 w-full" onClick={()=>{navigate("/")}}>Submit for approval</button>
                        :(<>
                            <button className="bg-success hover:bg-secondary rounded py-2 px-4 flex-1 max-w-1/2" onClick={()=>{navigate("/")}}>approve</button>
                            <button className="bg-warning hover:bg-secondary rounded py-2 px-4 flex-1 max-w-1/2" onClick={()=>{navigate("/")}}>reject</button>
                        </>
                        )
                    }
                </div>
            </div>
        </div>
    </div>
    )
}