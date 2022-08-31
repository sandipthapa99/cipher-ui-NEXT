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
    placeHolder?: string;
}

const requirements: Requirement[] = [];

const AddRequirements = ({
    field,
    onSubmit,
    title,
    description,
    placeHolder,
}: Props) => {
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
            <div className="list-item-requirements" key={index}>
                <li>
                    {index + 1}. {requirement.name}
                </li>

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
        <div className="add-requirements">
            <p className="requirements-title">{title}</p>
            <p className="requirement-desc">{description}</p>
            <Row>
                <Row>
                    <ol className="list-requirements">{renderTasks}</ol>
                </Row>
                <Row>
                    <div className="mt-4">
                        <InputGroup className="add-requirements--input-group">
                            <Form.Control
                                className="add-requirements--input"
                                placeholder={placeHolder}
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                value={require}
                                onKeyPress={handleEnterAdd}
                                onChange={(
                                    event: ChangeEvent<HTMLInputElement>
                                ) => {
                                    setRequire(event.target.value);
                                }}
                            />

                            <div className="add-requirements--button">
                                <FontAwesomeIcon
                                    onClick={addRequirements}
                                    icon={faCirclePlus}
                                    className="svg-icon "
                                    style={{ color: "#3EAEFF" }}
                                />
                            </div>
                        </InputGroup>
                    </div>
                </Row>
            </Row>
        </div>
    );
};
export default AddRequirements;
