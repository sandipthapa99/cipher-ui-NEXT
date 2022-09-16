import { useServiceCategories } from "@components/Task/PostTaskModal/TaskCategory";
import { faClose, faSearch } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { SelectItem } from "@mantine/core";
import { Button } from "@mantine/core";
import { Box, createStyles, Select, TextInput } from "@mantine/core";
import { useCities } from "hooks/use-cities";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

interface SearchCategoryProps {
    onParamsChange: (params: Record<string, string>) => void;
    onFilterClear: () => void;
}
export const SearchCategory = ({
    onParamsChange,
    onFilterClear,
}: SearchCategoryProps) => {
    const [params, setParams] = useState<Record<string, string> | undefined>();
    const [cityQuery, setCityQuery] = useState("");

    const { data: categories = [] } = useServiceCategories();
    const { data: cities } = useCities(cityQuery);

    const categoriesData: SelectItem[] = categories.map((category) => ({
        id: category.id,
        label: category.label,
        value: category.slug,
    }));
    const citiesData: SelectItem[] = cities.map((city) => ({
        id: city.id,
        label: city.name,
        value: city.name,
    }));
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
    const { classes } = useStyles();

    const onSelectChange = (key: string, value: string | null) => {
        if (!value) return;
        const url = new URL(window.location.href);
        url.searchParams.delete(key);
        url.searchParams.append(key, value);
        const newParams = Object.fromEntries(new URLSearchParams(url.search));
        setParams((previousParams) => ({ ...previousParams, ...newParams }));
    };
    const handleClearFilters = () => {
        setParams(undefined);
        onFilterClear();
    };
    const search = params ? params.search : "";
    const city = params ? params.city : "";
    const category = params ? params.category : "";
    const pricing = params ? params.ordering : "";

    useEffect(() => {
        if (!params) return;
        onParamsChange(params);
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
                        onSelectChange("search", event.currentTarget.value)
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
                    <Select
                        clearable
                        searchable
                        placeholder="Filter by Categories"
                        value={category}
                        data={categoriesData}
                        onChange={(value) => onSelectChange("category", value)}
                    />
                    <Select
                        clearable
                        searchable
                        placeholder="Filter by City"
                        value={city}
                        data={citiesData}
                        onSearchChange={setCityQuery}
                        onChange={(value) => onSelectChange("city", value)}
                    />
                    <Select
                        clearable
                        placeholder="Filter by Pricing"
                        value={pricing}
                        data={pricingData}
                        onChange={(value) => onSelectChange("ordering", value)}
                    />
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
