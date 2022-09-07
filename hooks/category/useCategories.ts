import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useUser } from "hooks/auth/useUser";
import { axiosClient } from "utils/axiosClient";

export const useCategories = () => {
    const { data } = useUser();
    return useQuery(
        ["categories"],
        async () => {
            try {
                const { data } = await axiosClient.get(
                    "/task/task-category/nested/"
                );
                return data;
            } catch (error) {
                if (error instanceof AxiosError) {
                    throw new Error(error?.response?.data?.message);
                }
                throw new Error("Something went wrong");
            }
        },
        { enabled: !!data }
    );
};
