import { faMagnifyingGlass } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";

interface SearchCategoryProps {
    onChange?: (text: string) => void;
    getOption?: (value: string | undefined) => void;
}
const DUMMY_DATA = [
    {
        category: "Category",
        value: "",
        nested: ["one", "two", "three"],
    },
    { category: "Distance", value: "", nested: ["30Km near"] },

    {
        category: "Any price",
        value: "",
        nested: ["Low to High", "High to Low"],
    },
    // { category: "Any price", nested: ["Low to High", "High to Low"] },
    // { category: "Any price", nested: ["Low to High", "High to Low"] },
    // { category: "Any price", nested: ["Low to High", "High to Low"] },
];

export const SearchCategory = ({
    onChange,
    getOption,
}: SearchCategoryProps) => {
    const [activeIndex, setActiveIndex] = useState<number>();
    const checkedIndex = useCallback(
        (index: number) => {
            return index === activeIndex;
        },
        [activeIndex]
    );

    const styles = (index: number) => {
        return {
            category: {
                color: checkedIndex(index) ? "#fff" : "#868e96",
                borderRadius: "20px",
                padding: "0.5rem 0.7rem",
                fontSize: "12px",
                backgroundColor: checkedIndex(index) ? "#0693e3" : "#fff",
                outline: "none",
                boder: "1px solid #ced4da",
            },
        };
    };
    const renderCategory = DUMMY_DATA.map((data, index) => {
        const renderNested = data.nested.map((nest, nestIndex) => {
            return (
                <option
                    key={nestIndex}
                    value={nest.split(" ").join("").toLowerCase()}
                >
                    {nest}
                </option>
            );
        });

        return (
            <select
                onChange={(e: any) => {
                    getOption(e.target.value ? e.target.value : "");
                    setActiveIndex(index);
                }}
                key={index}
                style={styles(index).category}
            >
                <option value={""}>{data.category}</option>
                {renderNested}
            </select>
        );
    });

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
                            onChange={(event: any) =>
                                onChange?.(event.currentTarget.value)
                            }
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
                <Col md={8} className="categories-tab ">
                    {renderCategory}
                </Col>
            </Row>
        </div>
    );
};

// function Category({ text }: { text: string }) {
//     return (
//         <div className="d-flex align-items-center gap-5">
//             <p>{text}</p>
//             <a>
//                 <FontAwesomeIcon className="boxes--icon" icon={faAngleDown} />
//             </a>
//         </div>
//     );
// }
