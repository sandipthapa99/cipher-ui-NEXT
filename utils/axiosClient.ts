import type { AxiosInstance } from "axios";
import axios from "axios";
import jwtDecode from "jwt-decode";
import type { GetServerSidePropsContext, PreviewData } from "next";
import nookies from "nookies";
import { parseCookies } from "nookies";
import type { ParsedUrlQuery } from "querystring";
import { autoLogin } from "utils/auth";

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
    }>("/user/token/refresh", {
        refresh: refreshToken,
    });
    const { access, refresh } = data;
    autoLogin(access, refresh);
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
        const config = error?.config;
        console.log(error);
    }
);

export { axiosClient };
