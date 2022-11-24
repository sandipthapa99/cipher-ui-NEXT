import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { UserService } from "services/userService";
import type { User } from "types/user";

export const useUser = () => {
    return useQuery<User | null>(
        ["user"],
        async () => {
            const access = Cookies.get("access");
            if (access === undefined) return null;
            const user = await UserService.fetchUser(access);
            console.log(user);

            return user;
        },
        { retry: false }
    );
};
