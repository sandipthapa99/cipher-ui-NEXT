import { Col } from "react-bootstrap";
export interface SearchBodyProps {
    number: number | string;
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
            }}
        >
            <Col className="task-card">
                <h1
                    style={{
                        color: `${props.textColor}`,
                    }}
                >
                    {props.number}
                </h1>
                <p>{props.textOne}</p>
            </Col>
        </div>
    );
};
