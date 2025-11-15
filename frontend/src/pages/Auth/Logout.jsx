import { useContext, useEffect } from "react"
import { AuthContext } from "../../AuthLogic/AuthContext"

export default function Logout(){
    const user = useContext(AuthContext);
    useEffect(() => {
        user.logout();
    }, [])

    return(
        <div>
            <h1>Logout Page</h1>
        </div>
    )
}