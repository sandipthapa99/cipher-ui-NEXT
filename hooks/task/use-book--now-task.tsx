import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import type { BookNowFormProps } from "types/bookNow";
import { axiosClient } from "utils/axiosClient";

export const useBookNowTask = () => {
    return useMutation<BookNowFormProps, Error, any>(async (bookNowPayload) => {
        try {
            const { data } = await axiosClient.post(
                "/task/entity/service-booking/",
                bookNowPayload
            );
            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error?.response?.data?.message);
            }
            throw new Error("Book Now failed");
        }
    });
};
