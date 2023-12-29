import axios from "axios";

const URL =
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:8000";

const authApi = axios.create({
  baseURL: `${URL}/api/`,
});

export const login = (credentials) => authApi.post("token/", credentials);

//export const logout = () => authApi.post("/logout/");