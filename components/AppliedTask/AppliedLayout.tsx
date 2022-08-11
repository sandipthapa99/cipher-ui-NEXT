import TaskAside from "@components/AppliedTask/taskAside";
import FullPageLoader from "@components/common/FullPageLoader";
import Footer from "@components/Footer";
import Header from "@components/Header";
import { SearchCategory } from "@components/SearchTask/searchCategory";
import SearchHeader from "@components/SearchTask/searchHeader";
import { useTasks } from "hooks/apply-task/useTask";
import type { ReactNode } from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";

const AppliedLayout = ({ children }: { children: ReactNode }) => {
    const [query, setQuery] = useState("");

    const { data, isLoading } = useTasks();

    if (isLoading || !data) return <FullPageLoader />;
    return (
        <>
            <SearchHeader />
            <Header />
            <Container>
                <SearchCategory onChange={setQuery} />
                <TaskAside query={query} appliedTasks={data.result}>
                    {children}
                </TaskAside>
            </Container>
            <Footer />
        </>
    );
};
export default AppliedLayout;
