import TaskAside from "@components/AppliedTask/taskAside";
import Layout from "@components/Layout";
import { SearchCategory } from "@components/SearchTask/searchCategory";
import { useQuery } from "@tanstack/react-query";
import { useTasks } from "hooks/apply-task/useTask";
import { useUser } from "hooks/auth/useUser";
import type { ReactNode } from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import type { ITaskApiResponse } from "types/task";
import { axiosClient } from "utils/axiosClient";

export const useSearchTask = (query: string, type: string) => {
    const { data: user, isLoading } = useUser();
    return useQuery(
        ["all-tasks", query],
        async () => {
            const { data } = await axiosClient.get<ITaskApiResponse>(
                `/task/?search=${query}&recommendation=${type ?? ""}`
            );
            const otherUserTasks = (data.result ?? []).filter(
                (task) => task.assigner.id !== user?.id
            );
            return otherUserTasks;
        },
        { enabled: !isLoading }
    );
};
const AppliedLayout = ({
    children,
    type,
}: {
    children: ReactNode;
    type?: string;
}) => {
    const [query, setQuery] = useState("");

    const { data, isLoading } = useTasks();
    const { data: searchData = [] } = useSearchTask(query, type ?? "");

    return (
        <Layout title="Find Tasks | Cipher">
            <Container>
                <SearchCategory type={type} onChange={setQuery} />
                <TaskAside
                    query={query}
                    appliedTasks={searchData}
                    type={type ?? ""}
                    isLoading={isLoading || !data}
                >
                    {children}
                </TaskAside>
            </Container>
        </Layout>
    );
};
export default AppliedLayout;
