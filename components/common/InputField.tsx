import { ErrorMessage, Field } from "formik";
import type { InputFieldProps } from "types/inputField";
import { checkFormControl, checkFormGroup } from "utils/helpers";

const InputField = ({
    name,
    error,
    touch,

    placeHolder,
    labelName,
    textMuted,
    as,
    fieldRequired,
    ...restProps
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
                {...restProps}
                name={name}
                id={name}
                className={checkFormControl(error, touch)}
                placeholder={placeHolder}
                as={as}
            />
            <ErrorMessage
                name={name}
                component="span"
                className="invalid-feedback"
            />
            {textMuted && <small className="text-muted">{textMuted}</small>}
        </div>
    );
};

export default InputField;
