import type { SelectItem, SelectProps } from "@mantine/core";
import { Select } from "@mantine/core";
import { useServiceOptions } from "hooks/service/use-service-options";
import { useState } from "react";

interface TaskCategoryProps extends Omit<SelectProps, "data"> {
    onServiceChange: (service: string) => void;
    data?: SelectItem[];
}
export const ServiceOptions = ({
    value,
    onServiceChange,
    ...rest
}: TaskCategoryProps) => {
    const { data: serviceOptions = [] } = useServiceOptions();

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
            placeholder="Select a category"
            value={service}
            onChange={handleServiceChange}
            // onSearchChange={setQuery}
            data={serviceOptions}
            required
        />
    );
};
