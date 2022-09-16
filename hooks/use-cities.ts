import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "utils/axiosClient";

export interface TaskCity {
    id: number;
    name: string;
}
export const useCities = (searchQuery: string) =>
    useQuery(
        ["cities"],
        () =>
            axiosClient
                .get<TaskCity[]>(
                    `/locale/client/city/options?search=${searchQuery}`
                )
                .then((response) => response.data),
        {
            initialData: [],
            enabled: Boolean(searchQuery && searchQuery.length > 2),
        }
    );
