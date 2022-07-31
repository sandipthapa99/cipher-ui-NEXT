import axios from "axios";
import { GetServerSidePropsContext, PreviewData } from "next";
import { parseCookies } from "nookies";
import { ParsedUrlQuery } from "querystring";

export const createAxiosClient = (
    context?: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
    const axiosClient = axios.create({
        baseURL: "http://localhost:3000",
        withCredentials: true,
    });
    const { token } = parseCookies(context);
    if (token) {
        axiosClient.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${token}`;
    }
    return axiosClient;
};
export const axiosClient = createAxiosClient();
