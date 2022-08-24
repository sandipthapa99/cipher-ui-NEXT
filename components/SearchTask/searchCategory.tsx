import { faMagnifyingGlass } from "@fortawesome/pro-regular-svg-icons";
import { faAngleDown } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { debounce } from "debounce";
import type { ChangeEvent } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";

interface SearchCategoryProps {
    onChange?: (text: string) => void;
}

export const SearchCategory = ({ onChange }: SearchCategoryProps) => {
    return (
        <div className="search-category">
            <Row className="rows">
                <Col md={4} className="input-col">
                    <InputGroup className="search-category--input-group">
                        <Form.Control
                            className="search-category--input"
                            placeholder="Find your Services &amp; Merchants"
                            aria-label="Find your Services &amp; Merchants"
                            aria-describedby="basic-addon2"
                            onChange={debounce(
                                (e: ChangeEvent<HTMLInputElement>) =>
                                    onChange?.(e.target.value),
                                400
                            )}
                        />
                        <Button
                            className="search-category--button"
                            id="button-addon2"
                        >
                            <FontAwesomeIcon
                                className="search-category--icon"
                                icon={faMagnifyingGlass}
                            />
                        </Button>
                    </InputGroup>
                </Col>
                <Col md={8} className="categories">
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
            <p>{text}</p>
            <a>
                <FontAwesomeIcon className="boxes--icon" icon={faAngleDown} />
            </a>
        </div>
    );
}
