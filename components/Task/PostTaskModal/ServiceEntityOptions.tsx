import type { SelectItem, SelectProps } from "@mantine/core";
import { Select } from "@mantine/core";
import { useSerivceEntity } from "hooks/service/use-service-entity";
import { useState } from "react";

interface TaskCategoryProps extends Omit<SelectProps, "data"> {
    onServiceChange: (service: string) => void;
    data?: SelectItem[];
}
export const ServiceEntityOptions = ({
    value,
    onServiceChange,
    ...rest
}: TaskCategoryProps) => {
    const { data: serviceEntityOptions = [] } = useSerivceEntity();

    const [service, setService] = useState(() => value);
    const handleServiceChange = (selectedService: string | null) => {
        if (!selectedService) return;
        onServiceChange(selectedService);
        setService(selectedService);
    };
    return (
        <Select
            {...rest}
            searchable
            label="Category"
            placeholder="Select a service"
            value={service}
            onChange={handleServiceChange}
            // onSearchChange={setQuery}
            data={serviceEntityOptions}
            required
        />
    );
};
