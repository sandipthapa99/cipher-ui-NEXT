import Footer from "@components/Footer";
import Header from "@components/Header";
import { SearchCategory } from "@components/SearchTask/searchCategory";
import SearchResults from "@components/SearchTask/SearchResults";
import type { NextPage } from "next";
import { useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import { getAllServicesNearYou } from "services/commonServices";

import SearchHeader from "../components/SearchTask/searchHeader";

const SearchPage: NextPage = () => {
    const servicesNearYou = getAllServicesNearYou();
    const [query, setQuery] = useState("");
    const filteredServices = useMemo(
        () =>
            query
                ? servicesNearYou.filter((service) =>
                      service.serviceTitle
                          .toLowerCase()
                          .includes(query.toLowerCase())
                  )
                : servicesNearYou,
        [query]
    );
    return (
        <>
            <SearchHeader />
            <Header />
            <Container fluid="xl">
                <SearchCategory onChange={setQuery} />
                <SearchResults servicesNearYou={filteredServices} />
            </Container>
            <Footer />
        </>
    );
};
export default SearchPage;
