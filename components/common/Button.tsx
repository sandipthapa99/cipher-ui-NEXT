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
}: BigButtonProps) => {
    return (
        <>
            <Button
                className="big-btn"
                onClick={handleClick}
                style={{
                    backgroundColor: `${backgroundColor}`,
                    color: `${textColor}!important`,
                }}
            >
                <span>{btnTitle}</span>
            </Button>
        </>
    );
};
export default BigButton;
