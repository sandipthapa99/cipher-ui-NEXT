import { ErrorMessage, Field } from "formik";
import {
    SelectInputFieldProps,
    SelectOptionProps,
} from "types/selectInputField";
import { checkFormControl, checkFormGroup } from "utils/helpers";

const SelectInputField = ({
    name,
    error,
    touch,
    placeHolder,
    labelName,
    textMuted,  
    fieldRequired = false,
    options,
    ...restProps
}: SelectInputFieldProps & Partial<HTMLInputElement>) => {
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
                as="select"
            >
                <option value="" defaultValue="">
                    {placeHolder}
                </option>
                {options.map((option: SelectOptionProps) => (
                    <option key={option?.id} value={option?.value}>
                        {option?.label}
                    </option>
                ))}
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

export default SelectInputField;
