import axios from "axios";
import { useAuth } from "../zustand/useAuth";

export const httpRequest = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

httpRequest.interceptors.request.use((config) => {
  debugger;
  const token = useAuth.getState()?.user?.accessToken;
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});
