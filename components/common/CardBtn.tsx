import { Loader } from "@mantine/core";
import { Button } from "react-bootstrap";
// import { userGet } from "utils/auth";

const CardBtn = ({
    btnTitle,
    backgroundColor,
    color,
    handleClick,
    id,
    border,
    type,
    loading,
}: {
    btnTitle: string;
    backgroundColor: string;
    color?: string;
    handleClick?: () => void;
    id?: string;
    border?: string;
    loading?: boolean;
    type?: "button" | "submit" | "reset" | undefined;
}) => {
    return (
        <>
            <Button
                onClick={handleClick}
                className="card-btn"
                type={type ?? undefined}
                // disabled={userGet()?.is_suspended}
                style={{
                    backgroundColor: `${backgroundColor}`,
                    color: `${color}`,
                    border: border,
                }}
            >
                <span>{loading ? <Loader size={"sm"} /> : btnTitle}</span>
            </Button>
        </>
    );
};
export default CardBtn;
