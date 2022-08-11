import TaskAside from "@components/AppliedTask/taskAside";
import Footer from "@components/Footer";
import Header from "@components/Header";
import { SearchCategory } from "@components/SearchTask/searchCategory";
import SearchHeader from "@components/SearchTask/searchHeader";
import { useApplyTask } from "hooks/apply-task/useTask";
import { ReactNode, useMemo } from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { AllTaskResult } from "types/applytask";

const AppliedLayout = ({ children }: { children: ReactNode }) => {
    const [query, setQuery] = useState("");

    const { data } = useApplyTask();

    const taskApplied = data?.data?.result;

    const filteredTasks = useMemo(
        () =>
            query
                ? taskApplied?.filter((item: AllTaskResult) =>
                      item?.title.toLowerCase().startsWith(query.toLowerCase())
                  )
                : taskApplied,
        [query, taskApplied]
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
