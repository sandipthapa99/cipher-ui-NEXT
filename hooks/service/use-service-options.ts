import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "utils/axiosClient";

export interface ServiceOptions {
    id: string;
    title: string;
}
export const useServiceOptions = () => {
    return useQuery(["service-options"], async () => {
        const { data } = await axiosClient.get<ServiceOptions[]>(
            "/task/service/list/"
        );
        const serviceItems = data.map((service) => ({
            id: service?.id,
            label: service?.title,
            value: service?.id,
        }));
        return serviceItems;
    });
};
