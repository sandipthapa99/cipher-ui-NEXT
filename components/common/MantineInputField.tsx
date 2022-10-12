import { TextInput } from "@mantine/core";
import type { FieldProps } from "formik";
import { Field } from "formik";
import type { InputHTMLAttributes } from "react";
import type { InputFieldProps } from "types/inputField";

const MantineInputField = ({
    name,
    error,
    placeHolder,
    labelName,
    fieldRequired,
}: InputFieldProps & InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <Field name={name}>
            {({
                form: { getFieldProps, touched, errors },
            }: FieldProps<any>) => (
                <TextInput
                    {...getFieldProps(name)}
                    placeholder={placeHolder}
                    label={labelName}
                    name={name}
                    error={touched[name] && errors[name] ? error : ""}
                    size="md"
                    required={fieldRequired}
                />
            )}
        </Field>
    );
};

export default MantineInputField;
