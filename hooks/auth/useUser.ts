import { useQuery } from "@tanstack/react-query";
import nookies from "nookies";
import { UserService } from "services/userService";
import type { User } from "types/user";

export const useUser = () => {
    return useQuery<User | undefined>(["user"], async () => {
        const { access } = nookies.get(undefined, "access");
        if (access === undefined) return undefined;
        const user = await UserService.fetchUser(access);
        return user;
    });
};
