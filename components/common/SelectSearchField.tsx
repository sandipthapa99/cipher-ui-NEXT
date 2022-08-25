import type { SelectProps } from "@mantine/core";
import { Select } from "@mantine/core";
import type { FieldProps } from "formik";
import { Field } from "formik";
import type { SelectSearchFieldProps } from "types/selectSearchValueProps";

const SelectSearchField = ({
    name,
    labelName,
    placeHolder,
    textMuted,
    options,
    error,
    touch,
    searchable,
    clearable,
    handleChange,
    nothingFound = "No options",
    ...restProps
}: SelectSearchFieldProps & Partial<SelectProps>) => {
    const errTouch = error && touch ? error : null;

    return (
        <Field name={name}>
            {({ field }: FieldProps) => (
                <Select
                    {...field}
                    {...restProps}
                    label={labelName}
                    error={errTouch}
                    placeholder={placeHolder}
                    nothingFound={nothingFound}
                    data={options}
                    description={textMuted}
                    mb={20}
                    onChange={handleChange}
                    styles={{
                        input: { height: 44 },
                        error: { fontSize: 13, fontWeight: 500 },
                    }}
                    autoComplete="off"
                    searchable={searchable}
                    clearable={clearable}
                />
            )}
        </Field>
    );
};

export default SelectSearchField;
