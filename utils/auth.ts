import { destroyCookie, setCookie } from "nookies";
import { axiosClient } from "utils/axiosClient";

export const autoLogin = (token: string) => {
    axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setCookie(undefined, "access", token);
};
export const autoLogout = () => {
    axiosClient.defaults.headers.common["Authorization"] = "";
    delete axiosClient.defaults.headers.common["Authorization"];
    destroyCookie(undefined, "access");
};
