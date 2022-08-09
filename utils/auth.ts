import { destroyCookie, setCookie } from "nookies";
import { axiosClient } from "utils/axiosClient";

/**
 * @description Stores token received after login into axiosclient and browser cookie
 */
export const autoLogin = (access: string, refresh: string) => {
    axiosClient.defaults.headers.common["Authorization"] = `Bearer ${access}`;
    setCookie(undefined, "access", access);
    setCookie(undefined, "refresh", refresh);
};

/**
 * @description Removes token from axiosclient and browser cookie
 */
export const autoLogout = () => {
    axiosClient.defaults.headers.common["Authorization"] = "";
    delete axiosClient.defaults.headers.common["Authorization"];
    destroyCookie(undefined, "access");
    destroyCookie(undefined, "refresh");
};
