import { destroyCookie, setCookie } from "nookies";
import { axiosClient } from "utils/axiosClient";

/**
 * @description Stores token received after login into axiosclient and browser cookie
 */
export const autoLogin = (token: string) => {
    axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setCookie(undefined, "access", token);
};

/**
 * @description Removes token from axiosclient and browser cookie
 */
export const autoLogout = () => {
    axiosClient.defaults.headers.common["Authorization"] = "";
    delete axiosClient.defaults.headers.common["Authorization"];
    destroyCookie(undefined, "access");
};
