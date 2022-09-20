import type { SelectItem, SelectProps } from "@mantine/core";
import { Select } from "@mantine/core";
import { useCities } from "hooks/use-cities";
import { useState } from "react";

export interface TaskCity {
    id: number;
    name: string;
}
export interface SelectCityProps extends Omit<SelectProps, "data"> {
    onCitySelect: (cityId: number) => void;
}
export const SelectCity = ({ onCitySelect, ...rest }: SelectCityProps) => {
    const [value, setValue] = useState("");
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
            data={selectCityData}
            onSearchChange={(value) => setQuery(value)}
            onChange={handleCityChange}
        />
    );
};
