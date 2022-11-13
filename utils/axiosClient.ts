import { QueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import axios from "axios";
import { compareAsc, fromUnixTime } from "date-fns";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { autoLogin, autoLogout } from "utils/auth";
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

const refreshAuthTokens = async (refreshToken: string) => {
    const url = new URL("/api/v1/user/token/refresh/", getApiEndpoint());
    fetch(url.href, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
    })
        .then((res) => res.json())
        .then((data) => {
            const { access, refresh } = <{ access: string; refresh: string }>(
                data
            );
            autoLogin(access, refresh);
            queryClient.invalidateQueries(["user"]);
        })
        .catch(() => autoLogout());
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
    async (error) => {
        const axiosError = error as AxiosError<{ code: string }>;
        if (axiosError.response?.status === 401) {
            const errorCode = axiosError.response?.data?.code;
            if (errorCode === "user_not_found") {
                autoLogout();
                return;
            }
            const access = Cookies.get("access");
            const refresh = Cookies.get("refresh");

            if (!access || !refresh) return Promise.reject(error);

            if (isTokenExpired(access)) {
                refreshAuthTokens(refresh);
            }
        }  
        return Promise.reject(error);
    }
);

export { axiosClient };
