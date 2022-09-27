import {
    faCity,
    faClose,
    faDollarSign,
    faGlobe,
    faGrid2,
    faLanguage,
    faSearch,
    faSort,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { SelectItem } from "@mantine/core";
import { Button } from "@mantine/core";
import { Box, createStyles, Select, TextInput } from "@mantine/core";
import { useCountry } from "hooks/dropdown/useCountry";
import { useLanguage } from "hooks/dropdown/useLanguage";
import { useServiceOptions } from "hooks/service/use-service-options";
import { useCities } from "hooks/use-cities";
import type { ChangeEvent } from "react";
import { useEffect } from "react";
import { useReducer } from "react";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";

import { ActionKind, searchReducer } from "./reducers/searchReducer";

type SearchModal = "task" | "tasker" | "service";
interface SearchCategoryProps {
    searchModal: SearchModal;
    onSearchParamChange: (searchParam: string) => void;
    onFilterClear: () => void;
}

export interface ServiceCategory {
    id: number;
    name: string;
    slug: string;
    icon: string;
}

export const SearchCategory = ({
    searchModal,
    onSearchParamChange,
    onFilterClear,
}: SearchCategoryProps) => {
    const { classes } = useStyles();

    const [params, dispatch] = useReducer(searchReducer, {});
    const [cityQuery, setCityQuery] = useState("");
    const { data: cities } = useCities(cityQuery);
    const { data: countries } = useCountry();
    const { data: languages } = useLanguage();

    const { data: servicesOptionsData = [] } = useServiceOptions();
    const citiesData: SelectItem[] = cities.map((city) => ({
        id: city.id,
        label: city.name,
        value: city.name,
    }));
    const languagesData: SelectItem[] = languages
        ? languages.result.map((language) => ({
              id: language.id,
              label: language.name,
              value: language.name,
          }))
        : [];
    const countriesData: SelectItem[] = countries
        ? countries.result.map((country) => ({
              id: country.id,
              label: country.name,
              value: country.name,
          }))
        : [];
    const pricingData: SelectItem[] = [
        {
            id: "1",
            label: "Low to High",
            value: "budget_to",
        },
        {
            id: "2",
            label: "High to Low",
            value: "-budget_to",
        },
    ];
    const orderTaskersData: SelectItem[] = [
        {
            id: 1,
            label: "Rating (Low to high)",
            value: "rating",
        },
        {
            id: 2,
            label: "Rating (High to low)",
            value: "-rating",
        },
        {
            id: 3,
            label: "Hourly rate (Low to high)",
            value: "hourly_rate",
        },
        {
            id: 4,
            label: "Hourly rate (High to low)",
            value: "-hourly_rate",
        },
    ];

    const orderServiceData: SelectItem[] = [
        {
            id: 1,
            label: "Newest services",
            value: "created_at",
        },
        {
            id: 2,
            label: "Oldest services",
            value: "-created_at",
        },
        {
            id: 3,
            label: "Budget (Low to High)",
            value: "budget_to",
        },
        {
            id: 4,
            label: "Budget (High to Low)",
            value: "-budget_to",
        },
    ];

    const hasParams = Object.keys(params).length > 0;

    const onSelectChange = (key: string, value: string | null) => {
        if (!value) {
            dispatch({ type: ActionKind.REMOVE, payload: { key } });
            return;
        }
        dispatch({ type: ActionKind.ADD, payload: { key, value } });
    };

    const handleClearFilters = () => {
        dispatch({ type: ActionKind.CLEAR });
        onFilterClear();
    };
    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        const searchText = event.currentTarget.value;
        if (searchText.length === 0) {
            dispatch({ type: ActionKind.REMOVE, payload: { key: "search" } });
            if (Object.keys(params).length === 0) {
                handleClearFilters();
            }
            return;
        }
        dispatch({
            type: ActionKind.ADD,
            payload: { key: "search", value: searchText },
        });
    };

    useEffect(() => {
        const urlSearchParams = new URLSearchParams();
        for (const key in params) {
            urlSearchParams.append(key, params[key]);
        }
        const searchParams = urlSearchParams.toString();
        onSearchParamChange(searchParams);
    }, [onSearchParamChange, params]);
    return (
        <Row className={classes.container}>
            <Col md={4}>
                <TextInput
                    value={params.search ?? ""}
                    icon={
                        <FontAwesomeIcon
                            icon={faSearch}
                            className="me-0 svg-icon"
                        />
                    }
                    placeholder="Enter a search keyword"
                    onChange={handleSearchChange}
                />
            </Col>

            <Col md={8} className="filter">
                <Box
                    className={
                        classes.categoriesContainer + " " + "box-modifier"
                    }
                >
                    {hasParams && (
                        <Button
                            leftIcon={
                                <FontAwesomeIcon
                                    icon={faClose}
                                    className="me-0 svg-icon"
                                />
                            }
                            variant="white"
                            color="red"
                            onClick={handleClearFilters}
                        >
                            Clear filters
                        </Button>
                    )}

                    {(searchModal === "task" || searchModal === "service") && (
                        <>
                            <Select
                                clearable
                                searchable
                                icon={
                                    <FontAwesomeIcon
                                        className="me-0 svg-icon"
                                        icon={faGrid2}
                                    />
                                }
                                placeholder="Filter by service"
                                value={params.service ?? ""}
                                data={servicesOptionsData}
                                onChange={(value) =>
                                    onSelectChange("service", value)
                                }
                            />
                            <Select
                                clearable
                                searchable
                                icon={
                                    <FontAwesomeIcon
                                        icon={faCity}
                                        className="me-0 svg-icon"
                                    />
                                }
                                placeholder="Filter by City"
                                value={params.city ?? ""}
                                data={citiesData}
                                onSearchChange={setCityQuery}
                                onChange={(value) =>
                                    onSelectChange("city", value)
                                }
                            />
                            {searchModal === "task" && (
                                <Select
                                    clearable
                                    icon={
                                        <FontAwesomeIcon
                                            icon={faDollarSign}
                                            className="me-0 svg-icon"
                                        />
                                    }
                                    placeholder="Filter by Pricing"
                                    value={params.ordering ?? ""}
                                    data={pricingData}
                                    onChange={(value) =>
                                        onSelectChange("ordering", value)
                                    }
                                />
                            )}
                        </>
                    )}
                    {searchModal === "tasker" && (
                        <>
                            <Select
                                clearable
                                searchable
                                icon={
                                    <FontAwesomeIcon
                                        icon={faGlobe}
                                        className="me-0 svg-icon"
                                    />
                                }
                                value={params.country ?? ""}
                                placeholder="Filter by country"
                                data={countriesData}
                                onChange={(value) =>
                                    onSelectChange("country", value)
                                }
                            />
                            <Select
                                clearable
                                icon={
                                    <FontAwesomeIcon
                                        icon={faLanguage}
                                        className="me-0 svg-icon"
                                    />
                                }
                                value={params.language ?? ""}
                                placeholder="Filter by language"
                                data={languagesData}
                                onChange={(value) =>
                                    onSelectChange("language", value)
                                }
                            />
                            <Select
                                clearable
                                searchable
                                icon={
                                    <FontAwesomeIcon
                                        icon={faSort}
                                        className="me-0 svg-icon"
                                    />
                                }
                                placeholder="Order by"
                                data={orderTaskersData}
                                value={params.ordering ?? ""}
                                onChange={(value) =>
                                    onSelectChange("ordering", value)
                                }
                            />
                        </>
                    )}
                    {searchModal === "service" && (
                        <Select
                            clearable
                            placeholder="Order by"
                            value={params.ordering ?? ""}
                            onChange={(value) =>
                                onSelectChange("ordering", value)
                            }
                            data={orderServiceData}
                        />
                    )}
                </Box>
            </Col>
        </Row>
    );
};
const useStyles = createStyles(() => ({
    container: {
        marginBlock: "2.4rem !important",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    categoriesContainer: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: "6px",
    },
}));