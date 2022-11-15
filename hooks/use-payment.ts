import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "utils/axiosClient";

export const usePayment = <T>(key: any[], provider: string) => {
    return useQuery(key, () => axiosClient.get<T>(provider), {
        enabled: false,
    });
};
