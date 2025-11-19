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
export const getAllRoutes = async (type) =>{
    try{
        const res = await api.get(
            `/routes/?status=${type.toLowerCase()}`
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

export const getUserRoutes = async (type) =>{
    try{
        const res = await api.get(
            `/routes/?status=${type.toLowerCase()}`
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

export const deleteRouteRequest = async (id) =>{
    try{
        const res = await api.delete(`/routes/${id}`);
        return { success: true, data: res.data };
    }
    catch (error) {
        return {
        success: false,
        error: error.response?.data?.message || error.message || "couldn't get the requested routes"
        };
    }
}