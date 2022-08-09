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

const handlerequestRefreshToken = async (
    axiosClient: AxiosInstance,
    refreshToken: string
) => {
    const { exp } = jwtDecode<{ exp: number }>(refreshToken);
    const tokenExpirationDate = new Date(exp * 1000);
    const isTokenExpired = tokenExpirationDate < new Date();
    if (isTokenExpired) {
        const { data } = await axiosClient.post<{
            access: string;
            refresh: string;
        }>("/user/token/refresh", {
            refresh: refreshToken,
        });
        const { access, refresh } = data;
        autoLogin(access, refresh);
    }
};

const axiosInterceptor = (axiosClient: AxiosInstance) => {
    axiosClient.interceptors.request.use((config) => {
        const { refresh } = nookies.get(undefined, "refresh");
        if (refresh !== undefined) {
            handlerequestRefreshToken(axiosClient, refresh);
        }
        return config;
    });
};

export const createAxiosClient = (
    context?: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
    const axiosClient = axios.create({
        baseURL: getApiEndpoint(),
    });
    const { access } = parseCookies(context, "access");
    if (access) {
        axiosClient.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${access}`;
    }
    axiosInterceptor(axiosClient);
    return axiosClient;
};
export const axiosClient = createAxiosClient();
