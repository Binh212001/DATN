import axios from "axios";

export const BASEURL = "http://localhost:8080/";

export const BaseApi = axios.create({
  baseURL: BASEURL,
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
