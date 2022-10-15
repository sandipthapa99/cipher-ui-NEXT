import { Button } from "react-bootstrap";

interface BookNowButtonProps {
    btnTitle: string;
    backgroundColor: string;
    showModal?: boolean;
    handleOnClick?: () => void;
    disabled?: boolean;
}

const BookNowButton = ({
    btnTitle,
    backgroundColor,
    handleOnClick,
    disabled,
}: BookNowButtonProps) => {
    return (
        <>
            <Button
                className="big-btn"
                onClick={handleOnClick}
                disabled={disabled}
                style={{
                    backgroundColor: `${backgroundColor}`,
                    color: "white !important",
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    border: "none",
                }}
            >
                <span>{btnTitle}</span>
            </Button>
        </>
    );
};
export default BookNowButton;
