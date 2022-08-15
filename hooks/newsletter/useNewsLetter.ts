import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { NewsletterDataTypes } from "types/newsletter";
import { axiosClient } from "utils/axiosClient";

export const useNewsLetter = () => {
    return useMutation<void, Error, NewsletterDataTypes>(async (email) => {
        try {
            const response = await axiosClient.post(
                "/support/newsletter/subscribe",
                email
            );
        } catch (error: any) {
            if (error instanceof AxiosError) {
                throw new Error(error?.response?.data?.email);
            }
            throw new Error("Something went wrong");
        }
    });
};
