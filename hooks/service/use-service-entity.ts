import { useQuery } from "@tanstack/react-query";
import urls from "constants/urls";
import type { ServicesValueProps } from "types/serviceCard";
import { axiosClient } from "utils/axiosClient";

export const useSerivceEntity = () => {
    return useQuery(["all-service_entity"], async () => {
        const { data } = await axiosClient.get<ServicesValueProps>(
            urls.task.service
        );
        const serviceEntityItems = data.result.map((service) => ({
            id: service?.id,
            label: service?.title,
            value: service?.id,
        }));
        return serviceEntityItems;
    });
};
