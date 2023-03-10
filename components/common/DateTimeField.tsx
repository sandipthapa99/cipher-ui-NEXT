import "react-datepicker/dist/react-datepicker.css";

import { CalendarTodayOutlined } from "@mui/icons-material";
import { ErrorMessage, Field } from "formik";
import React from "react";
import DateView from "react-datepicker";
import type { DatePickerProps } from "types/datePickerProps";
import { checkFormControl, checkFormGroup } from "utils/helpers";
const DatePickerField = ({
    name,
    error,
    touch,
    placeHolder,
    labelName,
    timeOnly,
    textMuted,
    dateFormat,
    fieldRequired = false,
    ...restProps
}: DatePickerProps & Partial<HTMLInputElement>) => {
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
                                autoComplete="off"
                                id={name}
                                {...field}
                                {...restProps}
                                className={`${checkFormControl(
                                    error,
                                    touch
                                )} ps-5 `}
                                showTimeSelect={timeOnly ?? undefined}
                                showTimeSelectOnly={timeOnly ?? undefined}
                                selected={value}
                                placeholderText={placeHolder}
                                onChange={(val) => setFieldValue(name, val)}
                                dateFormat={dateFormat}
                            />
                        );
                    }}
                </Field>
                <span className="position-absolute top-50 translate-middle-y">
                    <CalendarTodayOutlined className="svg-icon svg-icon-calender-grey ms-3" />
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
