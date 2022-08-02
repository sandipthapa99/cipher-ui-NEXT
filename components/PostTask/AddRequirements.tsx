import { faCirclePlus, faXmark } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { KeyboardEvent } from "react";
import type { ChangeEvent } from "react";
import { useState } from "react";
import { Form, InputGroup, Row } from "react-bootstrap";
import type { Requirement } from "types/requirement";

interface Props {
    field?: (label: string, value: unknown) => void;
    onSubmit?: (requirement: Requirement[]) => void;
    title?: string;
    description?: string;
}

const requirements: Requirement[] = [];

const AddRequirements = ({ field, onSubmit, title, description }: Props) => {
    const [requirementState, setRequirementState] = useState(requirements);
    const [require, setRequire] = useState("");

    const addRequirements = () => {
        if (!require) {
            alert("Empty");
        } else {
            setRequirementState((prev) => {
                const updatedValue = [
                    ...prev,
                    { id: prev.length === 0 ? 0 : prev.length, name: require },
                ];

                onSubmit?.(updatedValue);
                field?.("requirements", updatedValue);
                return updatedValue;
            });
        }

        setRequire("");
    };

    const handleEnterAdd = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            addRequirements();
        }
    };

    const deleteRequirements = (requirementId: number) => {
        setRequirementState((prev) => {
            const filtered = prev.filter(
                (prevItem) => prevItem.id !== requirementId
            );

            field?.("requirements", filtered);

            return filtered;
        });
    };

    const renderTasks = requirementState.map((requirement, index) => {
        return (
            <div
                key={index}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "1rem",
                }}
            >
                <li>{requirement.name}</li>

                <FontAwesomeIcon
                    icon={faXmark}
                    className="svg-icon"
                    style={{ marginRight: "2rem" }}
                    onClick={() => deleteRequirements(requirement.id)}
                />
            </div>
        );
    });
    return (
        <>
            <p
                className="price-text"
                style={{ fontSize: "14px", fontWeight: "bold" }}
            >
                {title}
            </p>
            <p className="price-text" style={{ fontSize: "12px" }}>
                {description}
            </p>
            <Row>
                <Row>
                    <ol style={{ marginLeft: "1.5rem" }}>{renderTasks}</ol>
                </Row>
                <Row>
                    <div className="mt-4">
                        <InputGroup
                            className="mb-3"
                            style={{ border: "1px solid #dee2e6" }}
                        >
                            <Form.Control
                                placeholder="Add requirements"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                value={require}
                                style={{ border: "none", outline: "none" }}
                                onKeyPress={handleEnterAdd}
                                onChange={(
                                    event: ChangeEvent<HTMLInputElement>
                                ) => {
                                    setRequire(event.target.value);
                                }}
                            />
                            {/* <button
                                id="button-addon2"
                                type="button"
                                onClick={addRequirements}
                                style={{
                                    margin: "0.7rem 0.5rem 0.5rem 0.5rem",
                                    border: "none",
                                    outline: "none",
                                    background: "white",
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faCirclePlus}
                                    className="svg-icon"
                                    style={{ color: "#3EAEFF" }}
                                />
                            </button> */}
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: "0 0 0 1rem",
                                }}
                            >
                                <FontAwesomeIcon
                                    onClick={addRequirements}
                                    icon={faCirclePlus}
                                    className="svg-icon"
                                    style={{ color: "#3EAEFF" }}
                                />
                            </div>
                        </InputGroup>
                    </div>
                </Row>
            </Row>
        </>
    );
};
export default AddRequirements;
