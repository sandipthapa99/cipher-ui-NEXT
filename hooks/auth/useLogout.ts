import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { autoLogout } from "utils/auth";

export interface UseLogoutOptions {
    onLogout: () => void;
}
export const useLogout = ({ onLogout }: UseLogoutOptions) => {
    const queryClient = useQueryClient();
    return useCallback(() => {
        queryClient.setQueryData(["user"], null);
        autoLogout();
        onLogout();
    }, [onLogout, queryClient]);
};
