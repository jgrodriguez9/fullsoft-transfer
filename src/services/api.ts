import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

interface AuthData {
  token: string;
}

interface ApiError {
  code: string;
  message: string;
  status: number;
  data: {
    message: string;
  };
}

const axiosApi: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosApi.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> => {
    /* const authData = localStorage.getItem(VITE_APP_AUTHKEY);
    
    if (authData) {
      try {
        const { token } = JSON.parse(authData) as AuthData;
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error('Error parsing auth data:', error);
      }
    } */

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosApi.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const apiError: ApiError = {
      code: error.code || "UNKNOWN_ERROR",
      message: error.message || "An unknown error occurred",
      status: error.response?.status || 500,
      data: error.response?.data,
    };

    if (error.code === "ERR_NETWORK") {
      apiError.message = "Network error - please check your connection";
    } else if (error.response?.status === 403) {
      //localStorage.removeItem(VITE_APP_AUTHKEY);
      //window.location.href = '/login';
    }

    return Promise.reject(apiError);
  }
);

export interface RequestConfig {
  params?: Record<string, any>;
  headers?: Record<string, string>;
  [key: string]: any;
}

export async function get<T>(
  url: string,
  config: RequestConfig = {}
): Promise<T> {
  const response = await axiosApi.get<T>(url, config);
  return response.data;
}

export async function post<T>(
  url: string,
  data: any = {},
  config: RequestConfig = {}
): Promise<T> {
  const response = await axiosApi.post<T>(url, data, config);
  return response.data;
}

export async function put<T>(
  url: string,
  data: any = {},
  config: RequestConfig = {}
): Promise<T> {
  const response = await axiosApi.put<T>(url, data, config);
  return response.data;
}

export async function del<T>(
  url: string,
  config: RequestConfig = {}
): Promise<T> {
  const response = await axiosApi.delete<T>(url, config);
  return response.data;
}

export default axiosApi;
