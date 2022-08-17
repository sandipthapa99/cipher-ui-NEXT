import { Button } from "react-bootstrap";

interface BigButtonProps {
    btnTitle: string;
    backgroundColor: string;
    textColor?: string;
    handleClick?: () => void;
    className?: string;
}

const BigButton = ({
    btnTitle,
    backgroundColor,
    textColor,
    handleClick,
    className,
}: BigButtonProps) => {
    return (
        <>
            <Button
                className={`big-btn ${className}`}
                style={{
                    backgroundColor: `${backgroundColor}`,
                    color: `${textColor}!important`,
                }}
                onClick={handleClick}
            >
                <span>{btnTitle}</span>
            </Button>
        </>
    );
};
export default BigButton;
