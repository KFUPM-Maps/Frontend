import axios from "axios";
import { API_BASE_URL } from "../config";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export let store = {
  accessToken: null,
  setAccessToken: (token) => {
    store.accessToken = token;
  },
  logout: () => {
    store.accessToken = null;
  },
};

export const setAuthStore = ({ accessToken, setAccessToken, logout }) => {
  store.accessToken = accessToken ?? null;

  if (setAccessToken) {
    store.setAccessToken = (token) => {
      store.accessToken = token;
      setAccessToken(token);
    };
  }

  if (logout) {
    store.logout = logout;
  }
};

api.interceptors.request.use((config) => {
  if (store.accessToken) {
    config.headers.Authorization = `Bearer ${store.accessToken}`;
  }
  return config;
});

let refreshPromise = null;

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error);
    }

    original._retry = true;

    if (!refreshPromise) {
      refreshPromise = api
        .post("/auth/refresh", {}, { withCredentials: true })
        .then((res) => {
          store.setAccessToken(res.data.accessToken);
          return res.data.accessToken;
        })
        .catch((err) => {
          store.logout();
          throw err;
        })
        .finally(() => {
          refreshPromise = null;
        });
    }

    const newToken = await refreshPromise;
    original.headers.Authorization = `Bearer ${newToken}`;
    return api(original);
  }
);

export default api;