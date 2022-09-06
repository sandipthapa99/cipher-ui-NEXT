import type { SelectItem, SelectProps } from "@mantine/core";
import { Select } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "utils/axiosClient";

export interface TaskCity {
    id: number;
    name: string;
}
export interface SelectCityProps extends Omit<SelectProps, "data"> {
    onCitySelect: (cityId: number) => void;
}
const useCities = () =>
    useQuery(
        ["task-cities"],
        () =>
            axiosClient
                .get<{ result: TaskCity[] }>("/locale/cms/city/")
                .then((response) => response.data.result),
        { initialData: [] }
    );
export const SelectCity = ({ onCitySelect, ...rest }: SelectCityProps) => {
    const { data: cities } = useCities();
    const selectCityData: SelectItem[] = cities.map((city) => ({
        id: city.id.toString(),
        label: city.name,
        value: city.id.toString(),
    }));
    const handleCityChange = (value: string | null) => {
        if (!value) return;
        const cityId = parseInt(value, 10);
        onCitySelect(cityId);
    };
    return (
        <Select
            {...rest}
            searchable
            required
            label="City"
            placeholder="Select your city"
            data={selectCityData}
            onChange={handleCityChange}
        />
    );
};
