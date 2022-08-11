import { useQuery } from "@tanstack/react-query";
import nookies from "nookies";
import { UserService } from "services/userService";
import type { User } from "types/user";

export const useUser = () => {
    return useQuery<User | null>(
        ["user"],
        async () => {
            const { access } = nookies.get(undefined, "access");
            if (access === undefined) return null;
            const user = await UserService.fetchUser(access);
            return user;
        },
        { retry: false }
    );
};
