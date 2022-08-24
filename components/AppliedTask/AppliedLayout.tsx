import TaskAside from "@components/AppliedTask/taskAside";
import FullPageLoader from "@components/common/FullPageLoader";
import Footer from "@components/Footer";
import Layout from "@components/Layout";
import { SearchCategory } from "@components/SearchTask/searchCategory";
import { useQuery } from "@tanstack/react-query";
import { useTasks } from "hooks/apply-task/useTask";
import type { ReactNode } from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import type { ITaskApiResponse } from "types/task";
import { axiosClient } from "utils/axiosClient";

export const useSearchTask = (query: string) => {
    return useQuery(["all-tasks", query], () =>
        axiosClient
            .get<ITaskApiResponse>(`/task/?search=${query}`)
            .then((response) => response.data.result)
    );
};
const AppliedLayout = ({ children }: { children: ReactNode }) => {
    const [query, setQuery] = useState("");

    const { data, isLoading } = useTasks();
    const { data: searchData = [] } = useSearchTask(query);

    if (isLoading || !data) return <FullPageLoader />;
    return (
        <Layout title="Find Tasks | Cipher">
            <Container>
                <SearchCategory onChange={setQuery} />
                <TaskAside query={query} appliedTasks={searchData}>
                    {children}
                </TaskAside>
            </Container>
            <Footer />
        </Layout>
    );
};
export default AppliedLayout;
