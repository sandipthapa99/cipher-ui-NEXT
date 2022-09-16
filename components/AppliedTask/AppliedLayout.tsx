import TaskAside from "@components/AppliedTask/taskAside";
import Layout from "@components/Layout";
import { SearchCategory } from "@components/SearchTask/searchCategory";
import { useQuery } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import type { ITaskApiResponse } from "types/task";
import { axiosClient } from "utils/axiosClient";

export const useSearchTask = (query: string, type: string) => {
    return useQuery(
        ["all-tasks", query],
        async () => {
            const { data } = await axiosClient.get<ITaskApiResponse>(
                `/task/?search=${query}&recommendation=${type ?? ""}`
            );
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
    const [sortTaskPrice, setSortTaskPrice] = useState([]);
    const [query, setQuery] = useState("");

    const { data: searchData = [], isFetching } = useSearchTask(
        query,
        type ?? ""
    );
    const getTaskSortByPrice = (task: any) => {
        setSortTaskPrice(task);
    };

    return (
        <Layout title="Find Tasks | Cipher">
            <section className="Tasks-section mb-5" id="Tasks-section">
                <Container>
                    <SearchCategory
                        type={type}
                        onChange={setQuery}
                        getTaskBySort={getTaskSortByPrice}
                    />
                    <TaskAside
                        query={query}
                        appliedTasks={
                            sortTaskPrice.length > 0
                                ? sortTaskPrice
                                : searchData
                        }
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
