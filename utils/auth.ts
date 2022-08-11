import { destroyCookie, setCookie } from "nookies";

/**
 * @description Stores token received after login into axiosclient and browser cookie
 */
export const autoLogin = (access: string, refresh: string) => {
    setCookie(undefined, "access", access);
    setCookie(undefined, "refresh", refresh);
};

/**
 * @description Removes token from axiosclient and browser cookie
 */
export const autoLogout = () => {
    destroyCookie(undefined, "access");
    destroyCookie(undefined, "refresh");
};
