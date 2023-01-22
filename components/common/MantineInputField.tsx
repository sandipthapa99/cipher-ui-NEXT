import { TextInput } from "@mantine/core";
import type { FieldProps } from "formik";
import { Field } from "formik";
import type { InputHTMLAttributes } from "react";
import type { InputFieldProps } from "types/inputField";

const MantineInputField = ({
    name,
    error,
    touch,
    placeHolder,
    labelName,
    fieldRequired,
    withAsterisk,
    ...rest
}: InputFieldProps & InputHTMLAttributes<HTMLInputElement>) => {
    const errTouch = error && touch ? error : null;
    return (
        <Field name={name}>
            {({ field }: FieldProps) => (
                <TextInput
                    {...field}
                    {...rest}
                    placeholder={placeHolder}
                    label={labelName}
                    withAsterisk={withAsterisk}
                    name={name}
                    error={errTouch}
                    size="md"
                    required={fieldRequired}
                />
            )}
        </Field>
    );
};

export default MantineInputField;
