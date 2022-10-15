import { Loader } from "@mantine/core";
import type { ButtonProps } from "react-bootstrap";
import { Button } from "react-bootstrap";

interface BigButtonProps extends ButtonProps {
    btnTitle: string;
    backgroundColor: string;
    textColor?: string;
    handleClick?: () => void;
    className?: string;
    border?: string;
    disabled?: boolean;
    loading?: boolean;
}

const BigButton = ({
    btnTitle,
    backgroundColor,
    textColor,
    handleClick,
    className,
    border,
    disabled,
    loading,
    ...rest
}: BigButtonProps) => {
    return (
        <>
            <Button
                {...rest}
                className={`big-btn ${className ? className : ""}`}
                style={{
                    backgroundColor: `${backgroundColor}`,
                    color: `${textColor}`,
                    border: `${border}`,
                }}
                onClick={handleClick}
                disabled={disabled}
            >
                <span>{loading ? <Loader size="sm" /> : btnTitle}</span>
            </Button>
        </>
    );
};
export default BigButton;
