import axios from "axios";

// Load the backend URL from the .env file
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const token = localStorage.getItem('token')

console.log('token --> ', token)

const api = axios.create({
  baseURL: backendUrl,
  headers: {
    authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

export const formApi = axios.create({
  baseURL: backendUrl,
  headers: {
    authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
  },
});

export default api;
