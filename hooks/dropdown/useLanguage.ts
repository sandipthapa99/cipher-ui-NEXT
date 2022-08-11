import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useUser } from "hooks/auth/useUser";
import { axiosClient } from "utils/axiosClient";

export type Language = {
    total_pages: number;
    count: number;
    current: number;
    next: any;
    previous: any;
    page_size: number;
    result: Array<{
        id: number;
        name: string;
        is_active: boolean;
        is_default: boolean;
        enable_language_configuration: boolean;
    }>;
};

export const useLanguage = () => {
    const { data } = useUser();
    return useQuery<Language>(
        ["language"],
        async () => {
            try {
                const { data } = await axiosClient.get<Language>(
                    "/locale/cms/language/"
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
