import { useQuery } from "@tanstack/react-query";
import nookies from "nookies";

export const useUser = () => {
    return useQuery<string | undefined>(["user"], async () => {
        const { access } = nookies.get(undefined, "access");
        if (access === undefined) return undefined;
        return Promise.resolve(access);
    });
};
