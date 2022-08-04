import { Button } from "react-bootstrap";

interface BookNowButtonProps {
    btnTitle: string;
    backgroundColor: string;
    showModal?: boolean;
    handleOnClick?: () => void;
}

const BookNowButton = ({
    btnTitle,
    backgroundColor,
    handleOnClick,
}: BookNowButtonProps) => {
    return (
        <>
            <Button
                className="big-btn"
                onClick={handleOnClick}
                style={{
                    backgroundColor: `${backgroundColor}`,
                    color: "white !important",
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                }}
            >
                <span>{btnTitle}</span>
            </Button>
        </>
    );
};
export default BookNowButton;
