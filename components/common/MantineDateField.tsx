import type { DatePickerProps } from "@mantine/dates";
import { DatePicker } from "@mantine/dates";
import type { FieldProps } from "formik";
import { Field } from "formik";
import type { DatePickerFieldProps } from "types/datePickerProps";

const MantineDateField = ({
    name,
    labelName,
    placeHolder,
    error,
    touch,
    fieldRequired,
    disabled,
    textMuted,
    handleChange,
    ...restProps
}: DatePickerFieldProps & DatePickerProps) => {
    const errTouch = error && touch ? error : null;

    return (
        <Field name={name}>
            {({ field }: FieldProps) => (
                <DatePicker
                    {...field}
                    {...restProps}
                    label={labelName}
                    description={textMuted}
                    placeholder={placeHolder}
                    error={errTouch}
                    withAsterisk={fieldRequired}
                    radius="sm"
                    onChange={handleChange}
                    mb={20}
                    disabled={disabled}
                    styles={{
                        input: { height: 44 },
                        error: { fontSize: 13, fontWeight: 500 },
                    }}
                />
            )}
        </Field>
    );
};

export default MantineDateField;
