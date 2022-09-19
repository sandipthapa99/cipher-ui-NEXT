import type { SelectItem, SelectProps } from "@mantine/core";
import { Select } from "@mantine/core";
import { useCities } from "hooks/use-cities";
import { useState } from "react";

type SelectCityProps = Omit<SelectProps, "data">;

export const SelectCity = (props: SelectCityProps) => {
    const [query, setQuery] = useState("");
    const { data: cities } = useCities(query);

    const citiesData: SelectItem[] = cities.map((city) => ({
        id: city.id,
        label: city.name,
        value: city.id.toString(),
    }));
    return (
        <Select
            {...props}
            searchable
            data={citiesData}
            onSearchChange={setQuery}
        />
    );
};
