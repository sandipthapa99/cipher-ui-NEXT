import { useQuery } from "@tanstack/react-query";
import type { ITask } from "types/task";
import { axiosClient } from "utils/axiosClient";

export interface NearbyTaskPayload {
    lng: number;
    lat: number;
}
export const useNearbyTasks = ({ lng, lat }: NearbyTaskPayload) => {
    return useQuery(
        ["nearby-tasks"],
        () =>
            axiosClient
                .get<{ result: ITask[] }>("/task/near-me", {
                    params: { longitude: lng, latitude: lat },
                })
                .then((response) => response.data.result),
        { initialData: [] }
    );
};
