import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useUser } from "hooks/auth/useUser";
import { axiosClient } from "utils/axiosClient";

export const useCurrency = () => {
    const { data } = useUser();
    return useQuery(
        ["currency"],
        async () => {
            try {
                const { data } = await axiosClient.get("/locale/cms/currency/");
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
