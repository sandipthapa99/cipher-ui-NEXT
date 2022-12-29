import type { SelectItem, SelectProps } from "@mantine/core";
import { Select } from "@mantine/core";
import type { FieldProps } from "formik";
import { Field } from "formik";
import { useServiceOptions } from "hooks/service/use-service-options";
import { useState } from "react";

interface TaskCategoryProps extends Omit<SelectProps, "data"> {
    onServiceChange: (service: string) => void;
    data?: SelectItem[];
}
export const ServiceOptions = ({
    name,
    onServiceChange,
    ...rest
}: TaskCategoryProps) => {
    const { data: serviceOptions = [] } = useServiceOptions();

    return (
        <Field name={name}>
            {({ field }: FieldProps) => (
                <Select
                    {...rest}
                    {...field}
                    name={name}
                    searchable
                    label="Category"
                    placeholder="Select a category"
                    onChange={onServiceChange}
                    data={serviceOptions}
                    required
                />
            )}
        </Field>
    );
};
