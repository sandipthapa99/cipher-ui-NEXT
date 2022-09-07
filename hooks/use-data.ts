import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "utils/axiosClient";

export const useData = <T>(key: string[], url: string, enable?: boolean) => {
    return useQuery(key, () => axiosClient.get<T>(url), { enabled: enable });
};
