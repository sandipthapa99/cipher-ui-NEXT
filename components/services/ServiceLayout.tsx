import {
    useClearSearchedServices,
    useClearSearchQuery,
    useSearchQuery,
} from "@components/common/Search/searchStore";
import Layout from "@components/Layout";
import { SearchCategory } from "@components/SearchTask/SearchCategory";
import { Box, Highlight, Space } from "@mantine/core";
import { debounce } from "lodash";
import type { ReactNode } from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";

import ServiceAside from "./ServiceAside";

const ServiceLayout = ({
    children,
    title,
    description,
    ogImage,
    ogUrl,
    serviceId,
}: {
    children: ReactNode;
    title?: string;
    description?: string;
    ogImage?: string;
    ogUrl?: string;
    serviceId?: string;
}) => {
    const [searchParam, setSearchParam] = useState("");

    const clearSearchQuery = useClearSearchQuery();
    const clearSearchedServices = useClearSearchedServices();
    const searchQuery = useSearchQuery();

    const handleSearchChange = debounce((query: string) => {
        // clear the searched services and search query only when search query has value from search field
        if (query) {
            clearSearchQuery();
            clearSearchedServices();
        }
        setSearchParam(query);
    }, 500);

    return (
        <Layout
            title={`Homaale | ${title ? title : `Find Services`}`}
            description={
                description ? description : "Explore services in homaale"
            }
            keywords="homaale-services"
            ogImage={ogImage ? ogImage : ""}
            ogUrl={ogUrl ? ogUrl : ""}
        >
            <section className="service-section mb-5" id="service-section">
                <Container fluid="xl" className="px-4 pb-5">
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
