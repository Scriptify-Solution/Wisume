import axios from "axios";
import { API_BASE_URL } from "./api";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const axiosInstanceFormData = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Add authorization dynamically for both
const addAuthToken = (axiosInstance) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

addAuthToken(axiosInstance);
addAuthToken(axiosInstanceFormData);

export { axiosInstance, axiosInstanceFormData };
