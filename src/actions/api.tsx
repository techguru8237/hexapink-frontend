import axios from "axios";

// Load the backend URL from the .env file
const backendUrl = import.meta.env.VITE_BACKEND_URL;

console.log('first', localStorage.getItem('token'))

const api = axios.create({
  baseURL: backendUrl,
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
    "Content-Type": "application/json",
  },
});

export const formApi = axios.create({
  baseURL: backendUrl,
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
    "Content-Type": "multipart/form-data",
  },
});

export default api;
