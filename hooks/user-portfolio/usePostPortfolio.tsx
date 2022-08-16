import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import type { AddPortfolioProps } from "types/editProfile";
import { axiosClient } from "utils/axiosClient";

export const usePostPortfolio = () => {
    return useMutation<void, Error, FormData>(async (formDetails) => {
        try {
            const { data } = await axiosClient.post(
                "/tasker/portfolio/",
                formDetails
            );
            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error?.response?.data?.message);
            }
            throw new Error("Something went wrong");
        }
    });
};
