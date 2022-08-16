import "@yaireo/tagify/dist/tagify.css"; // Tagify CSS

import Tags from "@yaireo/tagify/dist/react.tagify"; // React-wrapper file
import { ErrorMessage, Field } from "formik";
import type { InputFieldProps } from "types/inputField";
import { checkFormControl, checkFormGroup } from "utils/helpers";

const TagInputField = ({
    name,
    error,
    touch,
    placeHolder,
    labelName,
    textMuted,
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
                {({ form, field }: any) => {
                    const { setFieldValue } = form;
                    return (
                        <Tags
                            name={name}
                            id={name}
                            {...field}
                            placeholderText={placeHolder}
                            className="w-100"
                            onChange={(val) =>
                                setFieldValue(
                                    name,
                                    val.detail.tagify.value.map(
                                        (value) => value.value
                                    )
                                )
                            }
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
