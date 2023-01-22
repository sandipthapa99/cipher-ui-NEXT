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
            onClick={handleClick}
            disabled={disabled || isSubmitting || isLoading}
        >
            {!isLoading || !isSubmitting ? (
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
