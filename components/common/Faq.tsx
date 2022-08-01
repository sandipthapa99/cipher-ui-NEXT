import { Accordion } from "react-bootstrap";
export interface FaqProps {
    question: string;
    answer: string;
    id: string;
}

const FaqContent = ({ question, answer, id }: FaqProps) => {
    return (
        <div className="faq-container">
            <Accordion.Item eventKey={id}>
                <Accordion.Header>{question}</Accordion.Header>
                <Accordion.Body>
                    <p>{answer}</p>
                </Accordion.Body>
            </Accordion.Item>
        </div>
    );
};

export default FaqContent;
