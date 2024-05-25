import axios, { AxiosInstance } from "axios";

interface Token {
    accessToken?: string;
}

const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_ENDPOINT as string,
    timeout: 5000,
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {
        try {
            const token = JSON.parse(
                localStorage.getItem("token") || "{}",
            ) as Token;
            if (token.accessToken) {
                config.headers!.Authorization = `Bearer ${token.accessToken}`;
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
