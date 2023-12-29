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

export const getReports = () => authApi.get("/reportes/");
export const getReport = (reportId) => authApi.get(`/reportes/${reportId}/`);
export const createReport = (reportData) => authApi.post("/reportes/", reportData);
export const updateReport = (reportId, reportData) => authApi.put(`/reportes/${reportId}/`, reportData);
export const deleteReport = (reportId) => authApi.delete(`/reportes/${reportId}/`);
