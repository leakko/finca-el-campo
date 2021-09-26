import axios from "axios";
import { getAccessToken } from "../store/AccessTokenStore";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const create = (useAccessToken = true) => {
  const http = axios.create({
    baseURL: BASE_URL || "http://localhost:5000",
  });

  http.interceptors.request.use((request) => {
    if (useAccessToken && getAccessToken()) {
      request.headers.common.Authorization = `Bearer ${getAccessToken()}`;
    }
    return request;
  });

  http.interceptors.response.use((response) => response.data);

  return http;
};