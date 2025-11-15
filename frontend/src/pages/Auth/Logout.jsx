import { useContext, useEffect } from "react"
import { AuthContext } from "../../AuthLogic/AuthContext"
import { usePopup } from "../../components/Popup/PopupContext"

export default function Logout(){
    const user = useContext(AuthContext);
    const popup = usePopup();

    useEffect(() => {
        popup.showSuccess("Logged out successfully.");
        user.logout();
    }, [])

    return(
        <>
        </>
    )
}