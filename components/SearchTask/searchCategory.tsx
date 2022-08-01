import { faMagnifyingGlass } from "@fortawesome/pro-regular-svg-icons";
import { faAngleDown } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";

interface SearchCategoryProps {
    onChange?: (text: string) => void;
}

export const SearchCategory = ({ onChange }: SearchCategoryProps) => {
    return (
        <div className="search-category">
            <Row className="rows">
                <Col md={4}>
                    <InputGroup
                        style={{
                            width: "100%",
                            height: "50px",
                            border: "1px solid #ccc",
                        }}
                    >
                        <Form.Control
                            placeholder="Find your Services &amp; Merchants"
                            aria-label="Find your Services &amp; Merchants"
                            aria-describedby="basic-addon2"
                            style={{ border: "none", outline: "none" }}
                            onChange={(event) =>
                                onChange?.(event.currentTarget.value)
                            }
                        />
                        <Button
                            style={{
                                backgroundColor: "#fff",
                                padding: "0 2rem",
                                border: "none",
                            }}
                            id="button-addon2"
                        >
                            <FontAwesomeIcon
                                icon={faMagnifyingGlass}
                                style={{
                                    width: "1.5rem",
                                    height: "1.5rem",
                                    verticalAlign: "middle",
                                    display: "inline-block",
                                    fontSize: "12px",
                                    color: "#000",
                                }}
                            />
                        </Button>
                    </InputGroup>
                </Col>
                <Col
                    md={8}
                    className="categories"
                    style={{ display: "flex", flexDirection: "row" }}
                >
                    <Category text="Category" />
                    <Category text="30 km New Baneshwor, Kathmandu" />
                    <Category text="Any Price" />
                    <Category text="Service Type" />
                    <Category text="Sort" />
                </Col>
            </Row>
        </div>
    );
};

function Category({ text }: { text: string }) {
    return (
        <div className="boxes">
            <p style={{ margin: "0 0", fontSize: "12px", color: "#868E96" }}>
                {text}
            </p>
            <a>
                <FontAwesomeIcon
                    icon={faAngleDown}
                    style={{
                        width: "1.8rem",
                        height: "1.8rem",
                        verticalAlign: "middle",

                        fontSize: "12px",
                        color: "#868E96",
                    }}
                />
            </a>
        </div>
    );
}
