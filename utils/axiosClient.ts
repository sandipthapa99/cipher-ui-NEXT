import { QueryClient } from "@tanstack/react-query";
import type { AxiosError, AxiosInstance } from "axios";
import axios from "axios";
import { compareAsc, fromUnixTime } from "date-fns";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { autoLogin } from "utils/auth";
const queryClient = new QueryClient();

const getApiEndpoint = () => {
    const url = process.env.NEXT_PUBLIC_API_URL;
    if (url === undefined)
        throw new Error(
            "Please specify an API endpoint in the environment variable NEXT_PUBLIC_API_URL"
        );
    return url;
};

const isTokenExpired = (token: string) => {
    const { exp } = jwtDecode<{ exp: number }>(token);
    const tokenExpirationDate = fromUnixTime(exp);
    const currentTime = new Date();
    return compareAsc(tokenExpirationDate, currentTime) === -1;
};

const requestRefreshToken = async (
    axiosClient: AxiosInstance,
    refreshToken: string
) => {
    console.log("REFRESH TOKEN EXPIRED, REQUESTING A NEW ONE");
    const { data } = await axiosClient.post<{
        access: string;
        refresh: string;
    }>("/user/token/refresh/", {
        refresh: refreshToken,
    });
    const { access, refresh } = data;
    autoLogin(access, refresh);
    queryClient.invalidateQueries(["user"]);
};

const axiosClient = axios.create({
    baseURL: getApiEndpoint(),
});
axiosClient.interceptors.request.use(
    (config) => {
        const access = Cookies.get("access");
        if (access && !isTokenExpired(access)) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${access}`,
            };
        }
        return config;
    },
    (error) => Promise.reject(error)
);
axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 401) {
            const access = Cookies.get("access");
            const refresh = Cookies.get("refresh");

            if (!access || !refresh) return Promise.reject(error);

            if (isTokenExpired(access)) {
                requestRefreshToken(axiosClient, refresh);
            }
        }
        return Promise.reject(error);
    }
);

export { axiosClient };
