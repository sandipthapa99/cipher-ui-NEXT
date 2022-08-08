import { faPaperclipVertical } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessage } from "formik";
import type { DetailedHTMLProps, InputHTMLAttributes } from "react";
import type { FileInputFieldProps } from "types/fileInputField";
import { checkFormGroup } from "utils/helpers";

const FileInputField = ({
    name,
    error,
    touch,
    handleChange,
    placeHolder,
    labelName,
    fileName,
    textMuted,
    fieldRequired = false,
    ...restProps
}: FileInputFieldProps &
    Partial<
        DetailedHTMLProps<
            InputHTMLAttributes<HTMLInputElement>,
            HTMLInputElement
        >
    >) => {
    return (
        <div className={checkFormGroup(error)}>
            <label htmlFor={name} className="form-label">
                {labelName}{" "}
                {fieldRequired && <span className="asterisk">*</span>}
            </label>
            <div
                className={
                    error && touch
                        ? "file-attachment is-invalid"
                        : "file-attachment"
                }
            >
                <FontAwesomeIcon
                    icon={faPaperclipVertical}
                    className="svg-icon-paper-clip"
                />
                <span>
                    {fileName === undefined || fileName.length === 0
                        ? placeHolder
                        : fileName}
                </span>
                <input
                    {...restProps}
                    type="file"
                    name={name}
                    id={name}
                    className="fileUpload"
                    onChange={handleChange}
                />
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

export default FileInputField;
