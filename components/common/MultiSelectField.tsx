import "@yaireo/tagify/dist/tagify.css"; // Tagify CSS`

import { ErrorMessage, Field } from "formik";
import { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import type { InputFieldProps } from "types/inputField";
import { checkFormControl, checkFormGroup } from "utils/helpers";

const TagMultiSelectField = ({
    name,
    error,
    touch,
    placeHolder,
    data,
    labelName,
    textMuted,
    defaultValue,
    disabled,
    fieldRequired = false,
}: InputFieldProps & Partial<HTMLInputElement>) => {
    const [selectedservices, setSelectedservices] = useState([]);

    useEffect(() => {
        setSelectedservices(defaultValue);
        // const defaultInterests: number[] =
        //     defaultValue &&
        //     defaultValue.map((item: any) => {
        //         const values = item.id;

        //         return values;
        //     });
    }, []);

    const handleChange = (selectedOption: any) => {
        setSelectedservices(selectedOption);
    };

    return (
        <div className={checkFormGroup(error)}>
            {labelName && (
                <label htmlFor={name} className="form-label">
                    {labelName}{" "}
                    {fieldRequired && <span className="asterisk">*</span>}
                </label>
            )}
            <Field
                name={name}
                id={name}
                className={checkFormControl(error, touch)}
            >
                {({ form }: any) => {
                    const { setFieldValue } = form;
                    return (
                        <Select
                            isMulti
                            placeholder={placeHolder}
                            onChange={(e) => {
                                handleChange(e);
                                const values = e.map(
                                    (value: any) => value.value
                                );

                                // values.forEach((val) => {
                                //     setFieldValue(name, val);
                                //     console.log(val);
                                // });
                                setFieldValue(name, values);
                            }}
                            //  onChange={handleChange}
                            // defaultValue={defaultValue}
                            value={selectedservices}
                            options={Array.isArray(data) ? data : []}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            isDisabled={disabled}
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

export default TagMultiSelectField;
