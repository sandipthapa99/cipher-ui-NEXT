import { useMutation } from "@tanstack/react-query";
import type { AccountValueProps } from "types/accountValueProps";
import { axiosClient } from "utils/axiosClient";

export const useProfile = () => {
    return useMutation<void, Error, AccountValueProps>(
        async (accountPayload) => {
            try {
                const { data } = await axiosClient.post(
                    "/tasker/my-profile/",
                    accountPayload
                );
                console.log("Profile data", data);
            } catch (error) {
                throw new Error("Profile failed");
            }
        }
    );
};
