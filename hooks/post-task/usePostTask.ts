import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import type { PostTaskProps } from "types/postTaskData";
import { axiosClient } from "utils/axiosClient";

export const usePostTask = () => {
    return useMutation<void, Error, PostTaskProps>(async (postTaskDetails) => {
        try {
            const { data } = await axiosClient.post("/task/", postTaskDetails);
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error?.response?.data?.message);
            }
            throw new Error("Something went wrong");
        }
    });
};
