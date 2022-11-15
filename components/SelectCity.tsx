import type { SelectItem, SelectProps } from "@mantine/core";
import { Select } from "@mantine/core";
import { useCities } from "hooks/use-cities";
import { useEffect, useState } from "react";

interface SelectCityProps extends Omit<SelectProps, "data"> {
    data?: SelectItem[];
    onCityChange: (cityId: string) => void;
    countryId: string;
    changedCountry?: boolean;
}

export const SelectCity = ({
    data,
    value,
    countryId,
    onCityChange,
    changedCountry,
    ...props
}: SelectCityProps) => {
    const [query, setQuery] = useState("");
    const [city, setCity] = useState(value ?? "");

    const { data: allCities } = useCities(query, countryId);

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
        if (changedCountry === true) {
            setCity("");
        }
    }, [countryId, changedCountry]);

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
