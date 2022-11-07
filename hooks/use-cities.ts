import { useQuery } from "@tanstack/react-query";
import urls from "constants/urls";
import { axiosClient } from "utils/axiosClient";

export interface TaskCity {
    id: number;
    name: string;
    countryId: string;
}
export const useCities = (searchQuery: string, countryId: string) =>
    useQuery(
        ["cities", searchQuery, countryId],
        () =>
            axiosClient
                .get<TaskCity[]>(
                    `${urls.locale.city}${searchQuery}&country=${countryId}`
                )
                .then((response) => response.data),
        {
            initialData: [],
            enabled: Boolean(
                searchQuery && searchQuery.length > 2 && countryId !== ""
            ),
        }
    );
