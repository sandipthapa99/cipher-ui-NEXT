import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { axiosClient } from "utils/axiosClient";

export const usePostOffers = () => {
    return useMutation(async (offerPayload) => {
        try {
            const { data } = await axiosClient.get(
                `/task/service/?offer=${offerPayload}`
            );
            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error?.response?.data?.message);
            }
            throw new Error("Offer Not Found");
        }
    });
};
