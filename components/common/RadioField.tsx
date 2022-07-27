import { ErrorMessage, Field } from "formik";
import { InputFieldProps } from "types/inputField";
import { checkFormGroup } from "utils/helpers";

const RadioField = ({
    name,
    labelName,
    textMuted,
    error,
    fieldRequired = false,
    ...restProps
}: InputFieldProps & Partial<HTMLInputElement>) => {
    return (
        <div className={checkFormGroup(error)}>
            {labelName && (
                <div className="d-flex justify-content-between">
                    <label htmlFor={name} className="form-label">
                        {labelName}{" "}
                        {fieldRequired && <span className="asterisk">*</span>}
                    </label>
                </div>
            )}
            <label className="radio-block">
                <Field
                    {...restProps}
                    value="male"
                    name={name}
                    className="radio-block__input"
                    checked
                />
                Male
            </label>

            <label className="radio-block">
                <Field
                    {...restProps}
                    name={name}
                    value="female"
                    className="radio-block__input"
                />
                Female
            </label>

            <label className="radio-block">
                <Field
                    {...restProps}
                    name={name}
                    value="other"
                    className="radio-block__input"
                />
                Other
            </label>
            <ErrorMessage
                name={name}
                component="span"
                className="invalid-feedback"
            />
            {textMuted && <small className="text-muted">{textMuted}</small>}
        </div>
    );
};

export default RadioField;
