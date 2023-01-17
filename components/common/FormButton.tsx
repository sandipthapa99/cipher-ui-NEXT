import { Loader } from "@mantine/core";
import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import type { FormButtonProps } from "types/formButton";

const FormButton = ({
    name,
    isSubmitting,
    isSubmittingClass,
    className,
    variant,
    handleClick,
    id,
    disabled,
    isLoading,
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
            id={`form-button${id ? id : name}`}
            onClick={handleClick}
            disabled={disabled || isSubmitting || isLoading}
        >
            {!isSubmitting ? (
                <span>{name}</span>
            ) : (
                <span>
                    <Loader size="sm" />
                </span>
            )}
        </button>
    );
};

export default FormButton;
