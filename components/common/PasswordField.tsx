import { ErrorMessage, Field } from "formik";
import Link from "next/link";
import type { InputFieldProps } from "types/inputField";
import { checkFormControl, checkFormGroup } from "utils/helpers";

const PasswordField = ({
    name,
    labelName,
    touch,
    error,
    placeHolder,
    as,
    fieldRequired = false,
    forgotPassword,
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
                    <Link href="/forgot-password">
                        <a>{forgotPassword}</a>
                    </Link>
                </div>
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
        </div>
    );
};

export default PasswordField;
