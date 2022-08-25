import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "utils/axiosClient";

export const useData = <T>(key: string[], url: string) => {
    return useQuery(key, () => axiosClient.get<T>(url));
};
