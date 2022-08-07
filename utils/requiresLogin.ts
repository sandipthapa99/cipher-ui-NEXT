import type { GetServerSidePropsContext, PreviewData } from "next";
import nookies from "nookies";
import type { ParsedUrlQuery } from "querystring";
import { UserService } from "services/userService";

interface RequiresAuth<T> {
    context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>;
    redirectURL?: string;
    getProps?: () => T;
    restrictWhenLoggedIn?: boolean;
}

const redirectTo = (path?: string) => ({
    redirect: {
        destination: path ?? "/login",
        permanent: false,
    },
});

/**
 * @description Requires user to be logged in to access certain routes
 */
export const requiresAuth = async <T = void>({
    context,
    redirectURL,
    getProps,
}: RequiresAuth<T>) => {
    const { access } = nookies.get(context, "access");
    if (access === undefined) return redirectTo(redirectURL);
    const user = await UserService.fetchUser(access);
    if (!user) return redirectTo(redirectURL);
    if (getProps) {
        return {
            props: getProps(),
        };
    }
    return {
        props: {},
    };
};
