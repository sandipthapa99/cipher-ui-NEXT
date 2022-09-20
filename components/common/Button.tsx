import type { ButtonProps } from "react-bootstrap";
import { Button } from "react-bootstrap";

interface BigButtonProps extends ButtonProps {
    btnTitle: string;
    backgroundColor: string;
    textColor?: string;
    handleClick?: () => void;
    className?: string;
    border?: string;
}

const BigButton = ({
    btnTitle,
    backgroundColor,
    textColor,
    handleClick,
    className,
    border,
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
            >
                <span>{btnTitle}</span>
            </Button>
        </>
    );
};
export default BigButton;
