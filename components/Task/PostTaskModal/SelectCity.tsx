import type { SelectItem, SelectProps } from "@mantine/core";
import { Select } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { axiosClient } from "utils/axiosClient";

export interface TaskCity {
    id: number;
    name: string;
}
export interface SelectCityProps extends Omit<SelectProps, "data" | "value"> {
    value?: { id: number; name: string } | string;
    onCitySelect: (cityId: number) => void;
}
const useCities = (searchQuery: string) =>
    useQuery(
        ["task-cities", searchQuery],
        () =>
            axiosClient
                .get<TaskCity[]>(
                    `/locale/client/city/options?search=${searchQuery}`
                )
                .then((response) => response.data),
        { initialData: [], enabled: !!searchQuery && searchQuery.length >= 3 }
    );
export const SelectCity = ({ onCitySelect, ...rest }: SelectCityProps) => {
    const initialCity =
        typeof rest.value !== "string"
            ? {
                  id: rest?.value?.id ? rest?.value?.id : "",
                  label: rest?.value?.name ? rest?.value?.name : "",
                  value: rest?.value?.id ? rest?.value?.id.toString() : "",
              }
            : undefined;
    const [value, setValue] = useState(initialCity?.value ?? "");
    const [query, setQuery] = useState("");
    const { data: cities } = useCities(query);
    const selectCityData: SelectItem[] = cities.map((city) => ({
        id: city.id.toString(),
        label: city.name,
        value: city.id.toString(),
    }));
    const handleCityChange = (value: string | null) => {
        if (!value) return;
        const cityId = parseInt(value, 10);
        setValue(value);
        onCitySelect(cityId);
    };

    return (
        <Select
            {...rest}
            value={value}
            searchable
            required
            label="City"
            placeholder="Search and select your city"
            data={query ? selectCityData : initialCity ? [initialCity] : []}
            onSearchChange={(value) => setQuery(value)}
            onChange={handleCityChange}
        />
    );
};
