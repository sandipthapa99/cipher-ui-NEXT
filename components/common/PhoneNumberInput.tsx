import "react-phone-number-input/style.css";

import { ErrorMessage, Field } from "formik";
import { useUser } from "hooks/auth/useUser";
import type { InputHTMLAttributes } from "react";
import PhoneInput from "react-phone-number-input";
import type { InputFieldProps } from "types/inputField";
import { checkFormControl, checkFormGroup } from "utils/helpers";

const PhoneNumberInput = ({
    name,
    error,
    touch,
    placeHolder,
    labelName,
    textMuted,
    fieldRequired,
    ...restProps
}: InputFieldProps & InputHTMLAttributes<HTMLInputElement>) => {
    const { data: userDetails } = useUser();
    return (
        <div className={checkFormGroup(error)}>
            {labelName && (
                <label htmlFor={name} className="form-label">
                    {labelName}{" "}
                    {fieldRequired && <span className="asterisk">*</span>}
                </label>
            )}
            <Field name={name} className={checkFormControl(error, touch)}>
                {({ form, field }: any) => {
                    const { setFieldValue } = form;

                    return (
                        <PhoneInput
                            name={name}
                            {...restProps}
                            {...field}
                            international
                            className={`${checkFormControl(
                                error,
                                touch
                            )} py-0 pe-0`}
                            countrySelectProps={{ unicodeFlags: true }}
                            defaultCountry="NP"
                            id={name}
                            value={userDetails ? userDetails?.phone : ""}
                            placeholder={placeHolder}
                            onChange={(val) => setFieldValue(name, val)}
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

export default PhoneNumberInput;
