import TooltipMessage from "@components/common/Tooltip";
import { ErrorMessage, Field } from "formik";
import type { InputHTMLAttributes } from "react";
import type { InputFieldProps } from "types/inputField";
import { checkFormControl, checkFormGroup } from "utils/helpers";

const InputField = ({
    name,
    error,
    touch,
    inputIcon,
    placeHolder,
    haveIcon,
    labelName,
    textMuted,
    className,
    as,
    fieldRequired,
    ...restProps
}: InputFieldProps & InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <div className={`${checkFormGroup(error)} ${className}`}>
            {labelName && (
                <label htmlFor={name} className="form-label">
                    {labelName}{" "}
                    {fieldRequired && <span className="asterisk">*</span>}
                </label>
            )}
            {haveIcon ? (
                <div className="input-with-icon">
                    <Field
                        {...restProps}
                        name={name}
                        id={name}
                        className={checkFormControl(error, touch)}
                        placeholder={placeHolder}
                        as={as}
                    />
                    <TooltipMessage
                        message="Medical TAX(15% of Medical Expenses)"
                        place="right"
                    >
                        <div>{inputIcon}</div>
                    </TooltipMessage>
                </div>
            ) : (
                <Field
                    {...restProps}
                    name={name}
                    id={name}
                    className={checkFormControl(error, touch)}
                    placeholder={placeHolder}
                    as={as}
                />
            )}

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
