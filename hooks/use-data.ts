import { useQuery } from "@tanstack/react-query";
import type { UserProfileProps } from "types/userProfileProps";
import { axiosClient } from "utils/axiosClient";

export const useData = <T>(key: unknown[], url: string) => {
    return useQuery(key, () => axiosClient.get<T>(url));
};
