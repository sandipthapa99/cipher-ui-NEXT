import type { SelectProps } from "@mantine/core";
import { Select } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
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

interface TaskCategoryProps extends Omit<SelectProps, "data"> {
    onServiceChange: (service: string) => void;
}
export const ServiceOptions = ({
    value,
    onServiceChange,
    ...rest
}: TaskCategoryProps) => {
    const { data: serviceOptions = [] } = useServiceOptions();
    const [service, setService] = useState(value);
    const handleServiceChange = (selectedService: string | null) => {
        if (!selectedService) return;
        onServiceChange(selectedService);
        setService(selectedService);
    };
    return (
        <Select
            {...rest}
            searchable
            label="Service"
            placeholder="Select a service"
            value={service}
            onChange={handleServiceChange}
            data={serviceOptions}
            required
        />
    );
};
