import { Button } from "react-bootstrap";
import { userGet } from "utils/auth";

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
                disabled={userGet()?.is_suspended}
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
