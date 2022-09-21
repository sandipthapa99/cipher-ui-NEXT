import type { SelectItem, SelectProps } from "@mantine/core";
import { Select } from "@mantine/core";
import { useCities } from "hooks/use-cities";
import { useEffect, useState } from "react";

interface SelectCityProps extends Omit<SelectProps, "data"> {
    data?: SelectItem[];
    onCityChange: (cityId: string) => void;
}

export const SelectCity = ({
    data,
    value,
    onCityChange,
    ...props
}: SelectCityProps) => {
    const [query, setQuery] = useState("");
    const [city, setCity] = useState(value ?? "");
    const { data: allCities } = useCities(query);

    const citiesData: SelectItem[] = allCities.map((city) => ({
        id: city.id,
        label: city.name,
        value: city.id.toString(),
    }));
    const handleCityChange = (selectedCity: string | null) => {
        if (!selectedCity) return;
        onCityChange(selectedCity);
        setCity(selectedCity);
    };
    useEffect(() => {
        setCity(value ?? "");
    }, [value]);
    return (
        <Select
            {...props}
            searchable
            value={city}
            data={query ? citiesData : data ?? []}
            onChange={handleCityChange}
            onSearchChange={setQuery}
        />
    );
};
