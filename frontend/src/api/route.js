import api from "./api";

export const createRouteRequest = async (route) => {
  try {
    const res = await api.post("/routes", {
        title: route.title,
        firstBuilding: route.firstBuilding,
        secondBuilding: route.secondBuilding,
        steps: route.steps.map(s => ({index: s.index, caption: s.caption})),
    }, { withCredentials: true });
    return { success: true, data: res.data };
    
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'request failed'
    };
  }
};

export const updatePhotosRequest = async (routeId, data) => {
  try {
    const res = await api.put(`/routes/${routeId}/photos`, data, { withCredentials: true });
    return { success: true, data: res.data };
    
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Login failed'
    };
  }
};

export const likeRouteRequest = async (routeId, userId) => {
  try {
    const res = await api.put(`/routes/like/${routeId}`, { userId }, { withCredentials: true });
    return { success: true, data: res.data };
  }
  catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Request failed'
    };
  }
};

