import TaskAside from "@components/AppliedTask/taskAside";
import Layout from "@components/Layout";
import { SearchCategory } from "@components/SearchTask/searchCategory";
import { useQuery } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import type { ITaskApiResponse } from "types/task";
import { axiosClient } from "utils/axiosClient";

export const useSearchTask = (searchQuery: string) => {
    const url = `/task?${searchQuery}`;
    return useQuery(
        ["all-tasks", searchQuery],
        async () => {
            const { data } = await axiosClient.get<ITaskApiResponse>(url);
            return data.result;
        },
        { initialData: [] }
    );
};
const AppliedLayout = ({
    children,
    type,
}: {
    children: ReactNode;
    type?: string;
}) => {
    const [searchParam, setSearchParam] = useState("");

    const { data: searchData = [], isFetching } = useSearchTask(searchParam);
    return (
        <Layout title="Find Tasks | Cipher">
            <section className="Tasks-section mb-5" id="Tasks-section">
                <Container fluid="xl" className="px-5">
                    <SearchCategory
                        searchModal="task"
                        onFilterClear={() => setSearchParam("")}
                        onSearchParamChange={setSearchParam}
                    />
                    <TaskAside
                        query={searchParam}
                        appliedTasks={searchData}
                        type={type ?? ""}
                        isFetching={isFetching}
                    >
                        {children}
                    </TaskAside>
                </Container>
            </section>
        </Layout>
    );
};
export default AppliedLayout;
