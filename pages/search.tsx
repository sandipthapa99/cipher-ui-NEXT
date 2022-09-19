import Footer from "@components/Footer";
import Header from "@components/Header";
import { SearchCategory } from "@components/SearchTask/searchCategory";
import SearchResults from "@components/SearchTask/SearchResults";
import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import { useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import { axiosClient } from "utils/axiosClient";

import SearchHeader from "../components/SearchTask/searchHeader";

const SearchPage: NextPage = () => {
    const { data } = useQuery(["all-services"], () => {
        return axiosClient.get("/task/service/");
    });

    const [query, setQuery] = useState("");
    const filteredServices = useMemo(
        () =>
            query
                ? data?.data?.result?.filter((service: any) =>
                      service?.title
                          .toLowerCase()
                          .includes(query?.toLowerCase())
                  )
                : data?.data?.result,
        [query, data?.data?.result]
    );

    return (
        <>
            <SearchHeader />
            <Header />
            <Container fluid="xl">
                {/* <SearchCategory onChange={setQuery} /> */}
                <SearchResults servicesNearYou={filteredServices} />
            </Container>
            <Footer />
        </>
    );
};
export default SearchPage;
