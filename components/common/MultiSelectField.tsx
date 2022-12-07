import "@yaireo/tagify/dist/tagify.css"; // Tagify CSS`

import { ErrorMessage, Field } from "formik";
import { useCallback, useEffect, useMemo, useState } from "react";
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
    const [selectedservices, setselectedservices] = useState([]);

    useEffect(() => {
        setselectedservices(defaultValue && defaultValue);
        const defaultInterests: number[] =
            defaultValue &&
            defaultValue.map((item: any) => {
                const values = item.id;

                return values;
            });
        //   setId(defaultInterests);
    }, []);

    // useEffect(() => {
    //     setselectedservices(defaultValue);
    //     setId(selectedService);
    // }, []);

    const handleChange = (selectedOption: any) => {
        setselectedservices(selectedOption);
        // const selectedInterests: number[] =
        //     selectedOption &&
        //     selectedOption.map((item: any) => {
        //         const values = item.value;
        //         return values;
        //     });

        // console.log("selec", selectedInterests);
        // setFinalId(selectedInterests);
    };

    // console.log("id here now", id);

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
