import type { SelectItem, SelectProps } from "@mantine/core";
import { Select } from "@mantine/core";
import type { FieldProps } from "formik";
import { Field } from "formik";
import { useServiceOptions } from "hooks/service/use-service-options";

interface TaskCategoryProps extends Omit<SelectProps, "data"> {
    onServiceChange: (service: string) => void;
    data?: SelectItem[];
    touch?: boolean;
}
export const ServiceOptions = ({
    name,
    onServiceChange,
    onBlur,
    error,
    touch,
    ...rest
}: TaskCategoryProps) => {
    const { data: serviceOptions = [] } = useServiceOptions();

    const errTouch = error && touch ? error : null;

    return (
        <Field name={name}>
            {({ field }: FieldProps) => (
                <Select
                    {...rest}
                    {...field}
                    error={errTouch}
                    onBlur={onBlur}
                    withAsterisk
                    name={name}
                    searchable
                    label="Category"
                    placeholder="Select a category"
                    onChange={onServiceChange}
                    data={serviceOptions}
                />
            )}
        </Field>
    );
};
