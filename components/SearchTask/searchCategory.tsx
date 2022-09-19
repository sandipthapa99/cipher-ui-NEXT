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
import { useQuery } from "@tanstack/react-query";
import { useCountry } from "hooks/dropdown/useCountry";
import { useLanguage } from "hooks/dropdown/useLanguage";
import { useTaskers } from "hooks/tasker/use-tasker";
import { useCities } from "hooks/use-cities";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { axiosClient } from "utils/axiosClient";

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

    const [params, setParams] = useState<Record<string, string> | undefined>();
    const [cityQuery, setCityQuery] = useState("");

    const { data: categories = [] } = useQuery(["category-options"], () => {
        return axiosClient
            .get<ServiceCategory[]>("/task/cms/task-category/list/")
            .then((response) => {
                return response.data;
            });
    });
    const { data: cities } = useCities(cityQuery);
    const { data: countries } = useCountry();
    const { data: languages } = useLanguage();
    const { data: taskers } = useTaskers();
    console.log("abc", taskers);

    const categoriesData: SelectItem[] = categories.map((category) => ({
        id: category.id,
        label: category.name,
        value: category.slug,
    }));
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
    const taskersData: SelectItem[] =
        taskers && taskers?.length > 0
            ? Object.keys(taskers[0]).map((key, index) => ({
                  id: index,
                  label: key,
                  value: key,
              }))
            : [];

    const onSelectChange = (key: string, value: string | null) => {
        if (!value) return;
        const url = new URL(window.location.href);
        url.searchParams.delete(key);
        url.searchParams.append(key, value);
        const newParams = Object.fromEntries(new URLSearchParams(url.search));
        setParams((previousParams) => ({ ...previousParams, ...newParams }));
    };

    const search = params ? params.search : "";
    const city = params ? params.city : "";
    const country = params ? params.country : "";
    const language = params ? params.language : "";
    const category = params ? params.category : "";
    const ordering = params ? params.ordering : "";

    const handleClearFilters = () => {
        setParams(undefined);
        onFilterClear();
    };
    const handleSearchChange = (search: string) => {
        if (params && !search && Object.keys(params).length === 1) {
            setParams(undefined);
            onFilterClear();
            return;
        }
        setParams((previousParams) => ({
            ...previousParams,
            search,
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
                    icon={<FontAwesomeIcon icon={faSearch} />}
                    placeholder="Enter a search keyword"
                    onChange={(event) =>
                        handleSearchChange(event.currentTarget.value)
                    }
                />
            </Col>
            <Col md={8}>
                <Box className={classes.categoriesContainer}>
                    {params && (
                        <Button
                            leftIcon={<FontAwesomeIcon icon={faClose} />}
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
                                icon={<FontAwesomeIcon icon={faGrid2} />}
                                placeholder="Filter by Categories"
                                value={category}
                                data={categoriesData}
                                onChange={(value) =>
                                    onSelectChange("category", value)
                                }
                            />
                            <Select
                                clearable
                                searchable
                                icon={<FontAwesomeIcon icon={faCity} />}
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
                                        <FontAwesomeIcon icon={faDollarSign} />
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
                                icon={<FontAwesomeIcon icon={faGlobe} />}
                                value={country}
                                placeholder="Filter by country"
                                data={countriesData}
                                onChange={(value) =>
                                    onSelectChange("country", value)
                                }
                            />
                            <Select
                                icon={<FontAwesomeIcon icon={faLanguage} />}
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
                                icon={<FontAwesomeIcon icon={faSort} />}
                                placeholder="Order by"
                                data={taskersData}
                                value={ordering}
                                onChange={(value) =>
                                    onSelectChange("ordering", value)
                                }
                            />
                        </>
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
