import type { GetServerSidePropsContext, PreviewData } from "next";
import nookies from "nookies";
import type { ParsedUrlQuery } from "querystring";

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
export const requiresAuth = async <T = void>({
    context,
    redirectURL,
    getProps,
}: RequiresAuth<T>) => {
    // const user = await fetchUserFromServer(context);
    const { access: user } = nookies.get(context, "access");
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
