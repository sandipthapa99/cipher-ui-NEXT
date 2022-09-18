import {
    useClearSearchedServices,
    useClearSearchQuery,
    useSearchQuery,
} from "@components/common/Search/searchStore";
import Layout from "@components/Layout";
import { SearchCategory } from "@components/SearchTask/searchCategory";
import { faClose } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionIcon, Box, Highlight, Space } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import urls from "constants/urls";
import type { ReactNode } from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import type { ServicesValueProps } from "types/serviceCard";
import { axiosClient } from "utils/axiosClient";

import ServiceAside from "./ServiceAside";

export const useSearchService = (searchParam: string) => {
    return useQuery(["all-services", searchParam], () =>
        axiosClient
            .get<ServicesValueProps>(
                `${urls.task.service}&search=${searchParam}`
            )
            .then((response) => response.data.result)
    );
};

const ServiceLayout = ({ children }: { children: ReactNode }) => {
    const [searchParam, setSearchParam] = useState("");

    const clearSearchQuery = useClearSearchQuery();
    const clearSearchedServices = useClearSearchedServices();
    const searchQuery = useSearchQuery();

    const { data: searchData = [], isFetching } = useSearchService(searchParam);

    const handleClearSearchResults = () => {
        clearSearchedServices();
        clearSearchQuery();
    };

    const handleSearchChange = (query: string) => {
        clearSearchQuery();
        clearSearchedServices();
        setSearchParam(query);
    };

    return (
        <Layout title="Find Services | Cipher">
            <section className="service-section mb-5" id="service-section">
                <Container fluid="xl">
                    <SearchCategory
                        searchModal="service"
                        onSearchParamChange={handleSearchChange}
                        onFilterClear={() => setSearchParam("")}
                    />
                    {searchQuery?.query && (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Highlight highlight={searchQuery.query}>
                                {`Showing search results for ${searchQuery.query}`}
                            </Highlight>
                            <ActionIcon onClick={handleClearSearchResults}>
                                <FontAwesomeIcon icon={faClose} />
                            </ActionIcon>
                        </Box>
                    )}
                    <Space h={10} />
                    <ServiceAside
                        query={searchParam}
                        service={searchData}
                        isLoading={isFetching}
                    >
                        {children}
                    </ServiceAside>
                </Container>
            </section>
        </Layout>
    );
};
export default ServiceLayout;
