import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import type { SupportValuesProps } from "types/contact";
import { axiosClient } from "utils/axiosClient";

export const useSupport = () => {
    return useMutation<void, Error, SupportValuesProps>(
        async (supportDetails) => {
            try {
                const { data } = await axiosClient.post(
                    "/support/support-ticket/",
                    supportDetails
                );
            } catch (error) {
                if (error instanceof AxiosError) {
                    throw new Error(error?.response?.data?.message);
                }
                throw new Error("Something went wrong");
            }
        }
    );
};
