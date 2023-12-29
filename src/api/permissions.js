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

export const addReport = () => authApi.post("/reportes/asignar/");
export const addGroup = () => authApi.post("/grupos/asignar/");
export const removeReport = () => authApi.delete(`/reportes/quitar/`);
export const removeGroup = () => authApi.delete(`/grupos/quitar/`);
export const addAllPermissions = (userId) => authApi.post(`/todos/${userId}/`);
export const getPermissions = (userId) => authApi.get(`/usuario/${userId}/`); // Corregido: agregué el parámetro userId
