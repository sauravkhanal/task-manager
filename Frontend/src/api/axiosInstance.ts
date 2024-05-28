import local from "@/utils/localStorage";
import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_ENDPOINT as string,
    timeout: 5000,
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {
        try {
            const token = local.get("accessToken");
            if (token) {
                config.headers!.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.error("Failed to parse token:", error);
        }
        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    },
);

export default axiosInstance;
