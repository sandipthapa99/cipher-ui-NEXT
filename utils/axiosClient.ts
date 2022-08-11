import { QueryClient } from "@tanstack/react-query";
import type { AxiosInstance } from "axios";
import axios from "axios";
import { differenceInDays, fromUnixTime } from "date-fns";
import jwtDecode from "jwt-decode";
import { parseCookies } from "nookies";
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
        const { access } = parseCookies(undefined, "access");
        if (access) {
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
        if (error?.response?.data?.code === "token_not_valid") {
            const { refresh } = parseCookies(undefined, "refresh");
            const { access } = parseCookies(undefined, "access");

            const { exp } = jwtDecode<{ exp: number }>(access);
            const tokenExpirationDate = fromUnixTime(exp);
            const currentDate = new Date();
            const diff = differenceInDays(tokenExpirationDate, currentDate);
            if (diff <= 0) {
                requestRefreshToken(axiosClient, refresh);
            }
        }
    }
);

export { axiosClient };
