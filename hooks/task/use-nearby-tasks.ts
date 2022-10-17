import { useQuery } from "@tanstack/react-query";
import type { INearbyTask } from "types/nearbyTasks";
import { axiosClient } from "utils/axiosClient";

export interface NearbyTaskPayload {
    lng: number;
    lat: number;
}
export const useNearbyTasks = (nearbyTasksPayload?: NearbyTaskPayload) => {
    return useQuery(
        ["nearby-tasks"],
        () =>
            nearbyTasksPayload
                ? axiosClient
                      .get<{ result: INearbyTask[] }>("/task/near-me", {
                          params: {
                              longitude: nearbyTasksPayload.lng,
                              latitude: nearbyTasksPayload.lat,
                          },
                      })
                      .then((response) => response.data.result)
                : [],
        { initialData: [] }
    );
};
