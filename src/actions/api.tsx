import axios from "axios";
import { User } from "../types";

// Load the backend URL from the .env file
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: backendUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const currentUserString = localStorage.getItem("currentUser");
    if (currentUserString) {
      const currentUser: User = JSON.parse(currentUserString); // Parse the string into a User object
      if (currentUser.token) {
        config.headers.authorization = `Bearer ${currentUser.token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const formApi = axios.create({
  baseURL: backendUrl,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Add a request interceptor for formApi as well
formApi.interceptors.request.use(
  (config) => {
    const currentUserString = localStorage.getItem("currentUser");
    if (currentUserString) {
      const currentUser: User = JSON.parse(currentUserString); // Parse the string into a User object
      if (currentUser.token) {
        config.headers.authorization = `Bearer ${currentUser.token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
