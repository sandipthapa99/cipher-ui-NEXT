import type { GetServerSideProps } from "next";
import nookies from "nookies";
import { UserService } from "services/userService";

/**
 * @description Restricts user from accessing certain routes while logged in
 */
export const restrictOnLogin: GetServerSideProps = async (context) => {
    const { access } = nookies.get(context, "access");
    console.log("access", access);
    if (access === undefined) return { props: {} };
    const user = await UserService.fetchUser(access);
    if (user) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
    return {
        props: {},
    };
};
