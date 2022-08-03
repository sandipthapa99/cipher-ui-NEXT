import TaskAside from "@components/AppliedTask/taskAside";
import Footer from "@components/Footer";
import Header from "@components/Header";
import { SearchCategory } from "@components/SearchTask/searchCategory";
import SearchHeader from "@components/SearchTask/searchHeader";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import { taskApplied } from "staticData/taskApplied";

const AppliedLayout = ({ children }: { children: ReactNode }) => {
    const [query, setQuery] = useState("");
    const filteredTasks = useMemo(
        () =>
            query
                ? taskApplied.filter((item) =>
                      item.title.toLowerCase().startsWith(query.toLowerCase())
                  )
                : taskApplied,
        [query]
    );
    return (
        <>
            <SearchHeader />
            <Header />
            <Container>
                <SearchCategory onChange={setQuery} />
                <TaskAside query={query} appliedTasks={filteredTasks}>
                    {children}
                </TaskAside>
            </Container>
            <Footer />
        </>
    );
};
export default AppliedLayout;
