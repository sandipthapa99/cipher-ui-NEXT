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
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

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

    const [search, setSearch] = useState("");
    const [params, setParams] = useState<Record<string, string> | undefined>();
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

    const onSelectChange = (key: string, value: string | null) => {
        if (!value) return;
        const url = new URL(window.location.href);
        url.searchParams.delete(key);
        url.searchParams.append(key, value);
        const newParams = Object.fromEntries(new URLSearchParams(url.search));
        setParams((previousParams) => ({ ...previousParams, ...newParams }));
    };

    const city = params ? params.city : "";
    const country = params ? params.country : "";
    const language = params ? params.language : "";
    const service = params ? params.service : "";
    const ordering = params ? params.ordering : "";

    const handleClearFilters = () => {
        setParams(undefined);
        onFilterClear();
    };
    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        const searchText = event.currentTarget.value;
        if (searchText.length === 0) {
            const newParams = Object.entries(params ?? {}).reduce(
                (acc, curr) => {
                    const [key, value] = curr;
                    if (key !== "search") acc[key] = value;
                    return acc;
                },
                {} as Record<string, string>
            );
            if (Object.keys(newParams).length === 0) {
                handleClearFilters();
                setSearch("");
            }
            return;
        }
        setSearch(searchText);
        setParams((previousParams) => ({
            ...previousParams,
            search: searchText,
        }));
    };

    useEffect(() => {
        if (!params) return;
        const urlSearchParams = new URLSearchParams();
        for (const key in params) {
            urlSearchParams.append(key, params[key]);
        }
        onSearchParamChange(urlSearchParams.toString());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    return (
        <Row className={classes.container}>
            <Col md={4}>
                <TextInput
                    value={search}
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
                    {params && (
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
                                value={service}
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
                                value={city}
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
                                    value={ordering}
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
                                value={country}
                                placeholder="Filter by country"
                                data={countriesData}
                                onChange={(value) =>
                                    onSelectChange("country", value)
                                }
                            />
                            <Select
                                icon={
                                    <FontAwesomeIcon
                                        icon={faLanguage}
                                        className="me-0 svg-icon"
                                    />
                                }
                                value={language}
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
                                value={ordering}
                                onChange={(value) =>
                                    onSelectChange("ordering", value)
                                }
                            />
                        </>
                    )}
                    {searchModal === "service" && (
                        <Select
                            placeholder="Order by"
                            value={ordering}
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
