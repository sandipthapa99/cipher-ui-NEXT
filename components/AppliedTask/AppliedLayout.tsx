import TaskAside from "@components/AppliedTask/taskAside";
import Footer from "@components/Footer";
import Header from "@components/Header";
import { SearchCategory } from "@components/SearchTask/searchCategory";
import SearchHeader from "@components/SearchTask/searchHeader";
import type { ReactNode } from "react";
import { Container } from "react-bootstrap";
const AppliedLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <SearchHeader />
            <Header />
            <Container>
                <SearchCategory />
                <TaskAside>{children}</TaskAside>
            </Container>
            <Footer />
        </>
    );
};
export default AppliedLayout;
