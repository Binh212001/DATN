import axios from "axios";

export const BaseApi = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json",
  },
});

BaseApi.interceptors.request.use(async (config) => {
  return config;
});
BaseApi.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    throw error;
  }
);
