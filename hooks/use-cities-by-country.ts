import { useQuery } from "@tanstack/react-query";
import { useGetProfile } from "hooks/profile/useGetProfile";
import { axiosClient } from "utils/axiosClient";

export interface CitiesByCountry {
    id: number;
    name: string;
    local_name: string;
    zip_code: string;
    latitude: number;
    longitude: number;
    country: number;
}
export const useCitiesByCountry = (id?: string) => {
    const { data: profile, isLoading } = useGetProfile();
    const profileCityId = profile?.city?.id?.toString();

    const cityId = id ?? profileCityId;
    return useQuery(
        ["cities-by-country-id", isLoading, cityId],
        () =>
            axiosClient
                .get<CitiesByCountry[]>(`/locale/city-list/${cityId}/`)
                .then((response) => response.data),
        { enabled: !!(cityId && !isLoading), initialData: [] }
    );
};
