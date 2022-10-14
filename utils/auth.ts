import Cookies from "js-cookie";

/**
 * @description Stores token received after login into axiosclient and browser cookie
 */
export const autoLogin = (
    access: string,
    refresh: string,
    googleToken?: string | undefined
) => {
    autoLogout();
    Cookies.set("access", access);
    Cookies.set("refresh", refresh);
    if (googleToken !== undefined) {
        Cookies.set("credentials", googleToken);
    }
};

/**
 * @description Removes token from axiosclient and browser cookie
 */
export const autoLogout = () => {
    Cookies.remove("access");
    Cookies.remove("refresh");
    Cookies.remove("credentials");
};
