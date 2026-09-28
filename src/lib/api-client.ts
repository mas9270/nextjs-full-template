import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosProgressEvent,
  AxiosError,
} from "axios";
import { ApiResponse } from "@/types/api";
import { useAppStore } from "@/store/use-app-store";

export interface ExtendedAxiosRequestConfig extends AxiosRequestConfig {
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
  onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void;
}

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
  // timeout: 15000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        // ۱. پاکسازی نشست کاربر از استور کلاینت
        useAppStore.getState().logout();

        // ۲. هدایت کاربر با در نظر گرفتن زبان جاری به صفحه ورود
        const currentPath = window.location.pathname;
        const localeMatch = currentPath.match(/^\/(fa|en)(\/|$)/);
        const currentLocale = localeMatch ? localeMatch[1] : "fa";

        if (!currentPath.includes("/auth")) {
          window.location.href = `/${currentLocale}/auth?callbackUrl=${encodeURIComponent(currentPath)}`;
        }
      }
    }
    return Promise.reject(error.response?.data || error);
  },
);

export const http = {
  get: <T>(url: string, config?: ExtendedAxiosRequestConfig) =>
    apiClient.get<ApiResponse<T>>(url, config).then((res) => res.data),

  post: <T>(url: string, data?: unknown, config?: ExtendedAxiosRequestConfig) =>
    apiClient.post<ApiResponse<T>>(url, data, config).then((res) => res.data),

  put: <T>(url: string, data?: unknown, config?: ExtendedAxiosRequestConfig) =>
    apiClient.put<ApiResponse<T>>(url, data, config).then((res) => res.data),

  delete: <T>(url: string, config?: ExtendedAxiosRequestConfig) =>
    apiClient.delete<ApiResponse<T>>(url, config).then((res) => res.data),
};

export default apiClient;
