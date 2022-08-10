import type { GetServerSideProps } from "next";
import { UserService } from "services/userService";

/**
 * @description Restricts user from accessing certain routes while logged in
 */
export const restrictOnLogin: GetServerSideProps = async (context) => {
    // const user = await UserService.fetchUser({ type: "server", context });
    // if (user) {
    //     return {
    //         redirect: {
    //             destination: "/",
    //             permanent: false,
    //         },
    //     };
    // }
    return {
        props: {},
    };
};
