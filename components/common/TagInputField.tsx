import "@yaireo/tagify/dist/tagify.css"; // Tagify CSS`

import { MultiSelect } from "@mantine/core";
import { ErrorMessage, Field } from "formik";
import type { InputFieldProps } from "types/inputField";
import { checkFormControl, checkFormGroup } from "utils/helpers";
const TagInputField = ({
    name,
    error,
    touch,
    placeHolder,
    data,
    labelName,
    textMuted,
    disabled,
    value,
    fieldRequired = false,
}: InputFieldProps & Partial<HTMLInputElement>) => {
    return (
        <div className={checkFormGroup(error)}>
            {labelName && (
                <label htmlFor={name} className="form-label">
                    {labelName}{" "}
                    {fieldRequired && <span className="asterisk">*</span>}
                </label>
            )}
            <Field
                name={name}
                id={name}
                className={checkFormControl(error, touch)}
            >
                {({ form }: any) => {
                    const { setFieldValue } = form;
                    return (
                        <MultiSelect
                            disabled={disabled}
                            // disabled={profile ? true : false}
                            //  defaultValue={Array.isArray(data) ? data : []}
                            data={Array.isArray(data) ? data : []}
                            value={value}
                            placeholder={placeHolder}
                            className={checkFormControl(error, touch)}
                            variant="unstyled"
                            searchable
                            creatable
                            getCreateLabel={(query) => `+ Create ${query}`}
                            onChange={(val) => {
                                setFieldValue(name, val);
                            }}
                            // clearButtonLabel="Clear selection"
                            // clearable
                        />
                    );
                }}
            </Field>
            <ErrorMessage
                name={name}
                component="span"
                className="invalid-feedback"
            />
            {textMuted && <small className="text-muted">{textMuted}</small>}
        </div>
    );
};

export default TagInputField;
