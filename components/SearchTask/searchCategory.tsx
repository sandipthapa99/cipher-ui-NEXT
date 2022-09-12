import { faMagnifyingGlass } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ScrollArea } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "debounce";
import type { ChangeEvent } from "react";
import { useCallback, useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import type { ServicesValueProps } from "types/serviceCard";
import { axiosClient } from "utils/axiosClient";

import { useCategories } from "../../hooks/category/useCategories";

interface SearchCategoryProps {
    onChange?: (text: string) => void;
    getOption?: (value: string | undefined) => void;
    type?: string;
    getSortingByPrice?: any;
}

export const SearchCategory = ({
    onChange,
    getOption,
    type,
    getSortingByPrice,
}: SearchCategoryProps) => {
    const { data: allcategories } = useCategories();

    const categoriesValues = allcategories?.map((category: any) => {
        return {
            name: category?.name,
            value: category?.slug,
        };
    });

    // console.log("catgeory", categoriesValues);
    const DUMMY_DATA = [
        {
            category: "Category",
            value: "",
            nested: categoriesValues ? categoriesValues : [],
        },
        {
            category: "Distance",
            value: "",
            nested: [{ name: "30Km near", value: "" }],
        },

        {
            category: "Any price",
            value: "",
            nested: [
                { name: "Low to High", value: "budget_from" },
                { name: "High to Low", value: "-budget_from" },
            ],
        },
        {
            category: "Task Type",
            nested: [
                { name: "Low to High", value: "budget_from" },
                { name: "High to Low" },
            ],
        },
        {
            category: "Other Filters",
            nested: [
                { name: "Low to High", value: "budget_from" },
                { name: "High to Low", value: "budget_from" },
            ],
        },
        {
            category: "Sort",
            nested: [
                { name: "Low to High", value: "budget_from" },
                { name: "High to Low", value: "budget_from" },
            ],
        },
    ];
    const [priceQuery, setPriceQuery] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [activeIndex, setActiveIndex] = useState<number>();
    const [selected, setSelected] = useState(false);
    const checkedIndex = useCallback(
        (index: number) => {
            return index === activeIndex;
        },
        [activeIndex]
    );

    const useSearchServiceByPrice = (query: string) => {
        return useQuery(["all-service", query], () =>
            axiosClient
                .get<ServicesValueProps>(`/task/service/?ordering=${query}`)
                .then((response) => getSortingByPrice(response.data.result))
        );
    };
    const useSearchServiceByCategory = (query: string) => {
        return useQuery(
            ["all-service", query],
            () =>
                axiosClient
                    .get<ServicesValueProps>(`/task/service/?category=${query}`)
                    .then((response) => {
                        console.log("response", response.data.result);
                        getSortingByPrice(response.data.result);
                    }),
            {
                enabled: allcategories ? true : false,
            }
        );
    };

    const { data: searchDataByPrice } = useSearchServiceByPrice(priceQuery);
    const { data: searchDataByCategory } =
        useSearchServiceByCategory(categoryName);

    // getSortingByPrice(searchDataByPrice);
    // console.log("abc", searchDataByCategory);
    const styles = (index: number) => {
        return {
            category: {
                color: checkedIndex(index) ? "#fff" : "#868e96",
                borderRadius: "20px",
                padding: "0.5rem 0.7rem",
                fontSize: "14px",
                backgroundColor: checkedIndex(index) ? "#0693e3" : "#fff",
                outline: "none",
                boder: "1px solid #ced4da",
                borderRightWidth: "7px",
                borderColor: "white",
            },
        };
    };
    const renderCategory = DUMMY_DATA.map((data, index) => {
        const renderNested = data.nested.map((nest: any, nestIndex: number) => {
            return (
                <option
                    style={{
                        background: "#fff",
                        color: "#000",
                        marginTop: "2rem",
                        fontSize: "1.4rem",
                        padding: "0.5rem 0.7rem",
                    }}
                    key={nestIndex}
                    value={nest.value}
                >
                    {nest.name}
                </option>
            );
        });

        return (
            <select
                onChange={(e: any) => {
                    setActiveIndex(index);
                    if (data.category === "Any price") {
                        setPriceQuery(e.target.value);
                    }
                    if (data.category === "Category") {
                        console.log("category", e.target.value);

                        setCategoryName(e.target.value);
                    }
                }}
                key={index}
                style={styles(index).category}
            >
                <option
                    style={{ background: "#fff", color: "#000" }}
                    value={""}
                >
                    {data.category}
                </option>
                {renderNested}
            </select>
        );
    });

    return (
        <div className="search-category">
            <Row className="rows d-flex justify-content-center align-items-center">
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
                <Col md={8}>
                    <ScrollArea
                        offsetScrollbars
                        scrollbarSize={5}
                        className="mt-3 mt-md-0"
                    >
                        <div className="d-flex categories-tab mb-2">
                            {type !== "you may like" && renderCategory}
                        </div>
                    </ScrollArea>
                    {/* {renderCategory} */}
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
