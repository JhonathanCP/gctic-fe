// permissions.js
import axios from "axios";

const URL =
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:8000";

const authApi = axios.create({
  baseURL: `${URL}/permisos/`,
});

// Interceptor para incluir el token en los encabezados de todas las solicitudes
authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const addReport = (data) => authApi.post("/reportes/asignar/", data);
export const addGroup = (data) => authApi.post("/grupos/asignar/", data);
export const removeReport = (data) => authApi.delete("/reportes/quitar/", { data });
export const removeGroup = (data) => authApi.delete("/grupos/quitar/", { data });
export const addAllPermissions = (userId) => authApi.post(`/todos/${userId}/`);
export const getPermissions = (userId) => authApi.get(`/usuario/${userId}/`);
