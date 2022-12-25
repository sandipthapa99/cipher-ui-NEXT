import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useUser } from "hooks/auth/useUser";
import { axiosClient } from "utils/axiosClient";

export type Country = Array<{
    code: string;
    name: string;
}>;

export const useCountry = () => {
    const { data } = useUser();
    return useQuery<Country>(
        ["country"],
        async () => {
            try {
                const { data } = await axiosClient.get<Country>(
                    "/locale/client/country/options/"
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
