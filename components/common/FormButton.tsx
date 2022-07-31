import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { FormButtonProps } from "types/formButton";

const FormButton = ({
    name,
    isSubmittingClass,
    className,
    variant,
    ...restProps
}: FormButtonProps &
    Partial<
        DetailedHTMLProps<
            ButtonHTMLAttributes<HTMLButtonElement>,
            HTMLButtonElement
        >
    >) => {
    return (
        <button
            {...restProps}
            className={`${isSubmittingClass} ${variant} ${className}`}
        >
            <span>{name}</span>
        </button>
    );
};

export default FormButton;
