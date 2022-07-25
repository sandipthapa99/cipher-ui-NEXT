import TaskAside from "@components/AppliedTask/taskAside";
import Footer from "@components/Footer";
import Header from "@components/Header";
import { SearchCategory } from "@components/SearchTask/searchCategory";
import SearchHeader from "@components/SearchTask/searchHeader";
import type { NextPage } from "next";
import { Container } from "react-bootstrap";
const AppliedLayout: NextPage = () => {
    return (
        <>
            <SearchHeader />
            <Header />
            <Container>
                <SearchCategory />
                <TaskAside />
            </Container>
            <Footer />
        </>
    );
};
export default AppliedLayout;
