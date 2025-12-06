import api from "./api";

export const leaderboardRequest = async () => {
  try {
    const res = await api.get("/leaderboard");
    return { success: true, data: res.data };
    
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Login failed'
    };
  }
};

