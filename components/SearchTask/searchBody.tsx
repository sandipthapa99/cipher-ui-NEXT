import { Col } from "react-bootstrap";
export interface SearchBodyProps {
    number: string;
    textOne: string;
    color: string;
    textColor: string;
}
export const SearchBody = (props: SearchBodyProps) => {
    return (
        <div
            className="task-cards"
            style={{
                backgroundColor: `${props.color}`,
                padding: "1rem 0.5rem 1rem 1rem",
            }}
        >
            <Col className="task-card">
                <h1
                    style={{
                        color: `${props.textColor}`,
                        fontWeight: 500,
                        fontSize: "32px",
                    }}
                >
                    {props.number}
                </h1>
                <p
                    style={{
                        margin: "0",
                        maxWidth: "9rem",
                        fontSize: "12px",
                        lineHeight: "15px",
                    }}
                >
                    {props.textOne}
                </p>
            </Col>
        </div>
    );
};
