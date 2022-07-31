import { Button } from "react-bootstrap";

const CardBtn = ({
    btnTitle,
    backgroundColor,
    color,
}: {
    btnTitle: string;
    backgroundColor: string;
    color?: string;
}) => {
    return (
        <>
            <Button
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
