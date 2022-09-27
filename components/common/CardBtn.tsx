import { Button } from "react-bootstrap";

const CardBtn = ({
    btnTitle,
    backgroundColor,
    color,
    handleClick,
    id,
}: {
    btnTitle: string;
    backgroundColor: string;
    color?: string;
    handleClick?: () => void;
    id?: string;
}) => {
    return (
        <>
            <Button
                onClick={handleClick}
                className="card-btn"
                style={{
                    backgroundColor: `${backgroundColor}`,
                    color: `${color}`,
                }}
            >
                <span>{btnTitle}</span>
            </Button>
        </>
    );
};
export default CardBtn;
