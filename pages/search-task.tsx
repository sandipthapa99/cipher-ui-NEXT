import WelcomeUser from "@components/common/WelcomeUser";
import Footer from "@components/Footer";
import Header from "@components/Header";
import ApplyTask from "@components/Task/ApplyTask";
import type { NextPage } from "next";
import { Container } from "react-bootstrap";

import SearchHeader from "../components/SearchTask/searchHeader";

const SearchTask: NextPage = () => {
    return (
        <>
            <SearchHeader />
            <Header />

            <Container>
                <div>
                    <WelcomeUser />
                </div>
                <ApplyTask />
            </Container>

            <Footer />
        </>
    );
};

export default SearchTask;
