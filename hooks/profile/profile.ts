import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import type { AccountValueProps } from "types/accountValueProps";
import { axiosClient } from "utils/axiosClient";

export const useProfile = () => {
    return useMutation<void, Error, FormData>(async (accountPayload) => {
        try {
            const { data } = await axiosClient.post(
                "/tasker/my-profile/",
                accountPayload
            );
        } catch (error) {
            if (error instanceof AxiosError) {
                const values = Object.values(error?.response?.data);
                throw new Error(values.join("\n"));
            }
            throw new Error("Something went wrong");
        }
    });
};
