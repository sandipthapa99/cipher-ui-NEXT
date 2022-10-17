import { useQuery } from "@tanstack/react-query";
import type { INearbyServicesApiResponse } from "types/nearby-services";
import { ReactQueryKeys } from "types/queryKeys";
import { axiosClient } from "utils/axiosClient";

export const useNearbyServices = () => {
    return useQuery(
        [ReactQueryKeys.NEARBY_SERVICES],
        () =>
            axiosClient
                .get<INearbyServicesApiResponse>(
                    "/task/entity/service/near-me/"
                )
                .then((res) => res.data.result),
        { initialData: [] }
    );
};
