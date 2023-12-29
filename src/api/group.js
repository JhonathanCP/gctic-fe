import axios from "axios";

const URL =
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:8000";

const authApi = axios.create({
  baseURL: `${URL}`,
});

// Interceptor para incluir el token en los encabezados de todas las solicitudes
authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getGroups = () => authApi.get("/grupos/");
export const getGroup = (groupId) => authApi.get(`/grupos/${groupId}/`);
export const createGroup = (groupData) => authApi.post("/grupos/", groupData);
export const updateGroup = (groupId, groupData) => authApi.put(`/grupos/${groupId}/`, groupData);
export const deleteGroup = (groupId) => authApi.delete(`/grupos/${groupId}/`);
