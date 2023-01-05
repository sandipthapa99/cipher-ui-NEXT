import { faEye, faEyeSlash } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ErrorMessage, Field } from "formik";
import Link from "next/link";
import { useState } from "react";
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
    const [visible, setVisibility] = useState(false);
    const Icon = visible ? <Visibility /> : <VisibilityOff />;
    // <FontAwesomeIcon
    //     icon={visible ? faEye : faEyeSlash}
    //     className="svg-icon svg-color-grey svg-icon-eye-slash"
    // />

    const InputType = visible ? "text" : "password";
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
            <div className="d-flex align-items-center position-relative">
                <Field
                    {...restProps}
                    name={name}
                    id={name}
                    type={InputType}
                    className={checkFormControl(error, touch)}
                    placeholder={placeHolder}
                    as={as}
                />
                <span
                    className="position-absolute top-50 end-0 translate-middle-y me-4"
                    onClick={() => setVisibility((prevState) => !prevState)}
                    role="button"
                >
                    {Icon}
                </span>
            </div>
            <ErrorMessage
                name={name}
                component="span"
                className="invalid-feedback"
            />
        </div>
    );
};

export default PasswordField;
