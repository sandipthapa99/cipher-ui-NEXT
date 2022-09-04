import FullPageLoader from "@components/common/FullPageLoader";
import {
    useClearSearchedServices,
    useClearSearchQuery,
    useSearchedServices,
    useSearchQuery,
} from "@components/common/Search/searchStore";
import Footer from "@components/Footer";
import Layout from "@components/Layout";
import { SearchCategory } from "@components/SearchTask/searchCategory";
import { Highlight, Space } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useData } from "hooks/use-data";
import type { ReactNode } from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { useCheckSpecialOffer } from "store/use-check-special-offer";
import { useSpecialOfferDetails } from "store/use-special-offers";
import type { ServicesValueProps } from "types/serviceCard";
import { axiosClient } from "utils/axiosClient";

import ServiceAside from "./ServiceAside";

export const useSearchService = (query: string) => {
    return useQuery(["all-service", query], () =>
        axiosClient
            .get<ServicesValueProps>(`/task/service/list?search=${query}`)
            .then((response) => response.data.result)
    );
};

const ServiceLayout = ({ children }: { children: ReactNode }) => {
    const [query, setQuery] = useState("");
    const searchedServices = useSearchedServices();
    const clearSearchQuery = useClearSearchQuery();
    const clearSearchedServices = useClearSearchedServices();
    const searchQuery = useSearchQuery();
    const specialOfferDetails = useSpecialOfferDetails();
    const checkSpecialOffer = useCheckSpecialOffer();
    // console.log(specialOfferDetails, checkSpecialOffer);

    const { data, isLoading } = useData<ServicesValueProps>(
        ["all-services"],
        "/task/service/"
    );

    const { data: searchData = [] } = useSearchService(query);
    const handleSearchChange = (query: string) => {
        clearSearchQuery();
        clearSearchedServices();
        setQuery(query);
    };

    if (isLoading || !data) return <FullPageLoader />;
    return (
        <Layout title="Find Services | Cipher">
            <Container fluid="xl">
                <SearchCategory onChange={handleSearchChange} />
                {searchQuery?.query && (
                    <Highlight highlight={searchQuery.query}>
                        {`Showing search results for ${searchQuery.query}`}
                    </Highlight>
                )}
                <Space h={10} />
                <ServiceAside
                    query={query}
                    service={
                        checkSpecialOffer
                            ? specialOfferDetails
                            : searchedServices.length > 0
                            ? searchedServices
                            : searchData
                    }
                >
                    {children}
                </ServiceAside>
            </Container>
        </Layout>
    );
};
export default ServiceLayout;
