import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { axiosClient } from "utils/axiosClient";

export const useCategories = () => {
    return useQuery(["categories"], async () => {
        try {
            const { data } = await axiosClient.get("/task/cms/task-category");
            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error?.response?.data?.message);
            }
            throw new Error("Something went wrong");
        }
    });
};
