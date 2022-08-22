import TaskAside from "@components/AppliedTask/taskAside";
import FullPageLoader from "@components/common/FullPageLoader";
import Footer from "@components/Footer";
import Header from "@components/Header";
import Layout from "@components/Layout";
import { SearchCategory } from "@components/SearchTask/searchCategory";
import SearchHeader from "@components/SearchTask/searchHeader";
import { useTasks } from "hooks/apply-task/useTask";
import type { ReactNode } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";

const AppliedLayout = ({ children }: { children: ReactNode }) => {
    const [query, setQuery] = useState("");

    const { data, isLoading } = useTasks();

    const filteredTasks =
        useMemo(
            () =>
                query && data
                    ? data.result?.filter((item) =>
                          item?.title
                              .toLowerCase()
                              .includes(query.toLowerCase())
                      )
                    : data?.result,
            [data, query]
        ) ?? [];
    if (isLoading || !data) return <FullPageLoader />;
    return (
        <Layout title="Find Tasks | Cipher">
            <Container>
                <SearchCategory onChange={setQuery} />
                <TaskAside query={query} appliedTasks={filteredTasks}>
                    {children}
                </TaskAside>
            </Container>
            <Footer />
        </Layout>
    );
};
export default AppliedLayout;
