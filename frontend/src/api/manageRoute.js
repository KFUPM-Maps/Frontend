import api from "./api";

export const changeRouteStatusRequest = async (id, status) => {
  try {
    const res = await api.put(`/routes/manage/${id}`, {
        status,
    }, { withCredentials: true });
    return { success: true, data: res.data };
    
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'request failed'
    };
  }
};

