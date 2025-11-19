import api from "./api"

export const getRoutesRequest = async (firstBuilding, secondBuilding) =>{
    try{
        const res = await api.get(
            "/routes",
            { 
                params:{
                    firstBuilding,
                    secondBuilding
                }
            }
        );
        return { success: true, data: res.data };
    }
    catch (error) {
        return {
        success: false,
        error: error.response?.data?.message || error.message || "couldn't get the requested routes"
        };
    }
}