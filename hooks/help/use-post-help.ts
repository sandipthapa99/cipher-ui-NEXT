import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { axiosClient } from "utils/axiosClient";

export const usePostHelp = () => {
    return useMutation<void, Error, any>(async (helpPayload) => {
        try {
            const { data } = await axiosClient.post(
                "/support/help/",
                helpPayload
            );
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error?.response?.data?.message);
            }
            throw new Error("Help not sent");
        }
    });
};
