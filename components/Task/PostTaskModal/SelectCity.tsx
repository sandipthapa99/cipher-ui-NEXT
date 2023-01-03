import type { SelectItem, SelectProps } from "@mantine/core";
import { Select } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import type { FieldProps } from "formik";
import { Field } from "formik";
import { debounce } from "lodash";
import { useState } from "react";
import type { ITask } from "types/task";
import { axiosClient } from "utils/axiosClient";

export interface TaskCity {
    id: number;
    name: string;
}
export interface SelectCityProps extends Omit<SelectProps, "data" | "value"> {
    value: string;
    onCitySelect: (value: string | null) => void;
    data?: SelectItem[];
    name: string;
    initialCity?: ITask["city"];
    touch?: boolean;
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
        { enabled: !!searchQuery }
    );

export const SelectCity = ({
    onCitySelect,
    value,
    initialCity,
    touch,
    error,
    onBlur,
    name,
    ...rest
}: SelectCityProps) => {
    const [query, setQuery] = useState("");
    const { data: cities = [] } = useCities(query);

    const selectCityData: SelectItem[] = cities.map((city) => ({
        label: city.name,
        value: city.id.toString(),
    }));

    const InitialData = {
        label: initialCity?.name ? initialCity.name.toString() : "",
        value: initialCity?.id ? initialCity.id.toString() : "",
    };

    const errTouch = error && touch ? error : null;

    return (
        <Field name={name}>
            {({ field }: FieldProps) => (
                <Select
                    {...rest}
                    {...field}
                    name={name}
                    value={value}
                    error={errTouch}
                    withAsterisk
                    onBlur={onBlur}
                    searchable
                    nothingFound="No city found"
                    label="City"
                    placeholder="Search and select your city"
                    data={
                        selectCityData.length ? selectCityData : [InitialData]
                    }
                    onSearchChange={debounce((value) => {
                        if (value && value.length >= 3) setQuery(value);
                        else setQuery("");
                    }, 300)}
                    onChange={onCitySelect}
                />
            )}
        </Field>
    );
};
