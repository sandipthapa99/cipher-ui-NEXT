import type { AxiosInstance } from "axios";
import axios from "axios";
import type { GetServerSidePropsContext, PreviewData } from "next";
import { parseCookies } from "nookies";
import type { ParsedUrlQuery } from "querystring";

const getApiEndpoint = () => {
    const url = process.env.NEXT_PUBLIC_API_URL;
    if (url === undefined)
        throw new Error(
            "Please specify an API endpoint in the environment variable NEXT_PUBLIC_API_URL"
        );
    return url;
};

const axiosInterceptor = (axiosClient: AxiosInstance) => {
    axiosClient.interceptors.request.use((config) => {
        console.log("AXIOS INTERCEPTOR");
        return config;
    });
};

export const createAxiosClient = (
    context?: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
    const axiosClient = axios.create({
        baseURL: getApiEndpoint(),
    });
    const { token } = parseCookies(context, "token");
    if (token) {
        axiosClient.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${token}`;
    }
    axiosInterceptor(axiosClient);
    return axiosClient;
};
export const axiosClient = createAxiosClient();
