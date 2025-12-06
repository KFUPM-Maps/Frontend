import api from "./api";

export const loginRequest = async (email, password) => {
  try {
    const res = await api.post("/auth/login", { email, password });
    return { success: true, data: res.data };
    
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Login failed'
    };
  }
};

export const signupRequest = async (firstName, lastName, email, password) => {
  try {
    const res = await api.post("/auth/signup", { firstName, lastName, email, password });
    return { success: true, data: res.data };
    
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Signup failed'
    };
  }
};

export const logoutRequest = async () => {
  try {
    const res = await api.post(`/auth/logout`, {}, { withCredentials: true });
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Logout failed'
    };
  }
};