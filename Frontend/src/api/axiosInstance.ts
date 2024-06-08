import local from "@/utils/localStorage";
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { toast } from "sonner";

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

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        // If the response is successful, just return the response
        return response;
    },
    (error: AxiosError) => {
        console.log(error);
        // Check if error is related to network/connectivity issues
        if (!error.response) {
            // Network error (e.g., no internet connection)
            toast.error(
                "Unable to connect to the internet. Please check your network connection and try again",
            );
            return Promise.resolve({
                success: false,
                message: "Internet disconnected",
            });
        }

        // If error is not network-related, return the original error
        return Promise.reject(error);
    },
);

export default axiosInstance;
