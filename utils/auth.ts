import Cookies from "js-cookie";
import localforage from "localforage";

/**
 * @description Stores token received after login into axiosclient and browser cookie
 */
export const autoLogin = (access: string, refresh: string) => {
    autoLogout();
    Cookies.set("access", access);
    Cookies.set("refresh", refresh);
};

/**
 * @description Removes token from axiosclient and browser cookie
 */
export const autoLogout = () => {
    Cookies.remove("access");
    Cookies.remove("refresh");
    localforage.removeItem("fcm_token");
};
