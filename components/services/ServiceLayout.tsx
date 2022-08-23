import FullPageLoader from "@components/common/FullPageLoader";
import Footer from "@components/Footer";
import Layout from "@components/Layout";
import { SearchCategory } from "@components/SearchTask/searchCategory";
import { useData } from "hooks/use-data";
import type { ReactNode } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import type { ServicesValueProps } from "types/serviceCard";

import ServiceAside from "./ServiceAside";

const ServiceLayout = ({ children }: { children: ReactNode }) => {
    const [query, setQuery] = useState("");

    const { data, isLoading } = useData<ServicesValueProps>(
        ["all-services"],
        "/task/service/"
    );

    const filteredTasks =
        useMemo(
            () =>
                query && data
                    ? data.data.result?.filter((item) =>
                          item?.title
                              .toLowerCase()
                              .includes(query.toLowerCase())
                      )
                    : data?.data.result,
            [data, query]
        ) ?? [];
    if (isLoading || !data) return <FullPageLoader />;
    return (
        <Layout title="Find Services | Cipher">
            <Container>
                <SearchCategory onChange={setQuery} />
                <ServiceAside query={query} service={filteredTasks}>
                    {children}
                </ServiceAside>
            </Container>
            <Footer />
        </Layout>
    );
};
export default ServiceLayout;
