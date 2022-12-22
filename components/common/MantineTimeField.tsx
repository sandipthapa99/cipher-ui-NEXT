import type { DatePickerProps } from "@mantine/dates";
import { TimeInput } from "@mantine/dates";
import type { FieldProps } from "formik";
import { Field } from "formik";
import type { DatePickerFieldProps } from "types/datePickerProps";

const MantineTimeField = ({
    name,
    labelName,
    placeHolder,
    error,
    touch,
    fieldRequired,
    disabled,
    // defaultValue,
    textMuted,
    handleChange,
}: DatePickerFieldProps & DatePickerProps) => {
    const errTouch = error && touch ? error : null;

    return (
        <Field name={name}>
            {({ field }: FieldProps) => (
                <TimeInput
                    {...field}
                    label={labelName}
                    description={textMuted}
                    placeholder={placeHolder}
                    format="12"
                    size="md"
                    error={errTouch}
                    required={fieldRequired}
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

export default MantineTimeField;
