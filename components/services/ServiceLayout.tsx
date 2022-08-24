import FullPageLoader from "@components/common/FullPageLoader";
import Footer from "@components/Footer";
import Layout from "@components/Layout";
import { SearchCategory } from "@components/SearchTask/searchCategory";
import { useQuery } from "@tanstack/react-query";
import { useData } from "hooks/use-data";
import type { ReactNode } from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import type { ServicesValueProps } from "types/serviceCard";
import { axiosClient } from "utils/axiosClient";

import ServiceAside from "./ServiceAside";

export const useSearchService = (query: string) => {
    return useQuery(["all-service", query], () =>
        axiosClient
            .get<ServicesValueProps>(`/task/service/?search=${query}`)
            .then((response) => response.data.result)
    );
};

const ServiceLayout = ({ children }: { children: ReactNode }) => {
    const [query, setQuery] = useState("");

    const { data, isLoading } = useData<ServicesValueProps>(
        ["all-services"],
        "/task/service/"
    );

    const { data: searchData = [] } = useSearchService(query);

    if (isLoading || !data) return <FullPageLoader />;
    return (
        <Layout title="Find Services | Cipher">
            <Container fluid="xl">
                <SearchCategory onChange={setQuery} />
                <ServiceAside query={query} service={searchData}>
                    {children}
                </ServiceAside>
            </Container>
            <Footer />
        </Layout>
    );
};
export default ServiceLayout;
