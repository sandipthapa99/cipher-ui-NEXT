import { faChevronDown } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessage, Field } from "formik";
import type {
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
    getData,
    onChange,
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

            <div className="d-flex position-relative">
                <Field
                    {...restProps}
                    name={name}
                    id={name}
                    className={`${checkFormControl(error, touch)}`}
                    placeholder={placeHolder}
                    as="select"
                    //onChange={onChange}
                >
                    <option value="" defaultValue="">
                        {placeHolder}
                    </option>
                    {options?.map((option: SelectOptionProps) => (
                        <option key={option?.id} value={option?.value}>
                            {option?.label}
                        </option>
                    ))}
                </Field>
                <span className="position-absolute top-50 end-0 translate-middle-y me-4">
                    <FontAwesomeIcon
                        icon={faChevronDown}
                        className="svg-icon"
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

export default SelectInputField;
