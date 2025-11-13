import axios from "axios";
import { refreshTokenRequest } from "./auth";
import { API_BASE_URL } from "../config";

const api = axios.create({
  baseURL: API_BASE_URL,
  //withCredentials: true
});


// let store = { accessToken: null, setAccessToken: () => {} };
// export const setAuthStore = (newStore) => (store = newStore);

// api.interceptors.request.use((config) => {
//   if (store.accessToken) config.headers.Authorization = `Bearer ${store.accessToken}`;
//   return config;
// });

// api.interceptors.response.use(
//   (res) => res,
//   async (error) => {
//     const original = error.config;
//     if (error.response?.status === 401 && !original._retry) {
//       original._retry = true;
//       const data = await refreshTokenRequest();
//       store.setAccessToken(data.accessToken);
//       original.headers.Authorization = `Bearer ${data.accessToken}`;
//       return api(original);
//     }
//     return Promise.reject(error);
//   }
// );

export default api;
