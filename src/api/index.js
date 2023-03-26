import axios from "axios";
const defaultHeaders = {
  "Content-Type": "application/json",
};

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: defaultHeaders,
});

export const handleError = (error) => {
  return Promise.reject(error.response || error.message);
};

export default axiosInstance;
