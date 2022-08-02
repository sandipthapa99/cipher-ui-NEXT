import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { FormButtonProps } from "types/formButton";

const FormButton = ({
    name,
    isSubmitting,
    isSubmittingClass,
    className,
    variant,
    handleClick,
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
            onClick={handleClick}
        >
            <span>{name}</span>
        </button>
    );
};

export default FormButton;
