import "react-datepicker/dist/react-datepicker.css";

import { faCalendar } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessage, Field } from "formik";
import React from "react";
import DateView from "react-datepicker";
import { InputFieldProps } from "types/inputField";
import { checkFormControl, checkFormGroup } from "utils/helpers";

const DatePickerField = ({
    name,
    error,
    touch,
    placeHolder,
    labelName,
    textMuted,
    as,
    fieldRequired = false,
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
            <div className="d-flex position-relative">
                <Field name={name}>
                    {({ form, field }: any) => {
                        const { setFieldValue } = form;
                        const { value } = field;
                        return (
                            <DateView
                                id={name}
                                {...field}
                                {...restProps}
                                className={checkFormControl(error, touch)}
                                selected={value}
                                placeholderText={placeHolder}
                                onChange={(val) => setFieldValue(name, val)}
                                dateFormat="dd/MM/yyy"
                            />
                        );
                    }}
                </Field>
                <span className="position-absolute position-absolute top-50 end-0 translate-middle-y">
                    <FontAwesomeIcon
                        icon={faCalendar}
                        className="svg-icon me-5"
                    />
                </span>
            </div>
            <ErrorMessage
                name={name}
                component="span"
                className="invalid-feedback"
            />
            {textMuted && <small className="text-muted">{textMuted}</small>}
        </div>
    );
};

export default DatePickerField;
