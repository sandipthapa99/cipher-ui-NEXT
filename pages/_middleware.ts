import jwtDecode from "jwt-decode";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { User } from "types/user";

const PROTECTED_ROUTES = [
    "/profile",
    "/home",
    "/settings/*",
    "/add-service",
    "/feedback",
];
const RESTRICTED_ROUTES_ON_LOGGED_IN = ["/login"];

const fetchUser = async (access?: string) => {
    if (!access) return undefined;
    try {
        const { user_id } = jwtDecode<{ user_id: string }>(access);
        const url = new URL(
            `/api/v1/user/${user_id}`,
            process.env.NEXT_PUBLIC_API_URL
        );
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${access}`,
            },
        });
        const user = (await response.json()) as User;
        return user;
    } catch (error) {
        return undefined;
    }
};

export default async function middleware(request: NextRequest) {
    const currentPath = request.nextUrl.pathname;
    const isPathProtected = () => {
        return PROTECTED_ROUTES.some((path) => {
            if (path.endsWith("*")) {
                const pathPrefix = path.slice(0, -1);
                return currentPath.startsWith(pathPrefix);
            }
            return PROTECTED_ROUTES.indexOf(currentPath) !== -1;
        });
    };
    const isRestrictedOnLoggedIn =
        RESTRICTED_ROUTES_ON_LOGGED_IN.indexOf(currentPath) !== -1;

    const { access } = request.cookies;

    const user = await fetchUser(access);

    if (!user && isPathProtected()) {
        return NextResponse.redirect(
            new URL(`/login?next=${currentPath}`, request.nextUrl)
        );
    }
    if (user && isRestrictedOnLoggedIn) {
        return NextResponse.redirect(new URL("/", request.nextUrl));
    }
    return NextResponse.next();
}
