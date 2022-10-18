import {
    useClearSearchedServices,
    useClearSearchQuery,
    useSearchQuery,
} from "@components/common/Search/searchStore";
import Layout from "@components/Layout";
import { SearchCategory } from "@components/SearchTask/SearchCategory";
import { Box, Highlight, Space } from "@mantine/core";
import type { ReactNode } from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";

import ServiceAside from "./ServiceAside";

const ServiceLayout = ({ children }: { children: ReactNode }) => {
    const [searchParam, setSearchParam] = useState("");

    const clearSearchQuery = useClearSearchQuery();
    const clearSearchedServices = useClearSearchedServices();
    const searchQuery = useSearchQuery();

    const handleSearchChange = (query: string) => {
        // clear the searched services and search query only when search query has value from search field
        if (query) {
            clearSearchQuery();
            clearSearchedServices();
        }
        setSearchParam(query);
    };

    return (
        <Layout title="Find Services | Homaale">
            <section className="service-section mb-5" id="service-section">
                <Container fluid="xl" className="px-5 pb-5">
                    <SearchCategory
                        searchModal="service"
                        onSearchParamChange={handleSearchChange}
                        onFilterClear={() => setSearchParam("")}
                    />

                    {searchQuery?.query && (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "1rem",
                            }}
                        >
                            <Highlight highlight={searchQuery.query}>
                                {`Showing search results for ${searchQuery.query}`}
                            </Highlight>
                        </Box>
                    )}
                    <Space h={10} />
                    <ServiceAside searchParam={searchParam}>
                        {children}
                    </ServiceAside>
                </Container>
            </section>
        </Layout>
    );
};
export default ServiceLayout;
