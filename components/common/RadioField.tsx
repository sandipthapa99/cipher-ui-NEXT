import { ErrorMessage, Field } from "formik";
import { Fragment } from "react";
import type { InputFieldProps } from "types/inputField";
import { checkFormGroup } from "utils/helpers";

const RadioField = ({
    name,
    labelName,
    textMuted,
    error,
    variables,
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
            {/* {variables?.map((value, key) => (
                <label className="radio-block" key={key}>
                    <Field
                        {...restProps}
                        value={value.value}
                        name={name}
                        className="radio-block__input"
                        checked
                    />
                    {value.label}
                </label>
            ))} */}
            <Field
                name={name}
                className={`${checkFormGroup(error)} check-group`}
            >
                {({ field }: any) => {
                    return variables?.map((option) => {
                        return (
                            <Fragment key={option.value}>
                                <input
                                    type="radio"
                                    id={option.value}
                                    {...field}
                                    {...restProps}
                                    value={option.value}
                                    className="check-group__input"
                                    checked={field.value === option.value}
                                />
                                <label
                                    htmlFor={option.value}
                                    className="mx-3 check-group__input"
                                >
                                    {option.label}
                                </label>
                            </Fragment>
                        );
                    });
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

export default RadioField;
