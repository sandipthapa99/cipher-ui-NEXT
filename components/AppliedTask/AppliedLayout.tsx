import TaskAside from "@components/AppliedTask/taskAside";
import Layout from "@components/Layout";
import { SearchCategory } from "@components/SearchTask/SearchCategory";
import { useQuery } from "@tanstack/react-query";
import urls from "constants/urls";
import type { ReactNode } from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import type { ITaskApiResponse } from "types/task";
import { axiosClient } from "utils/axiosClient";

export const useSearchTask = (searchQuery: string) => {
    const url = `${urls.task.my_task}&${searchQuery}`;

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
    title,
}: {
    children: ReactNode;
    type?: string;
    title?: string;
}) => {
    const [searchParam, setSearchParam] = useState("");
    return (
        <Layout title={`Homaale | ${title ? title : `Find Tasks`}`}>
            <section className="Tasks-section mb-5" id="Tasks-section">
                <Container fluid="xl" className="px-4 pb-5">
                    <SearchCategory
                        searchModal="task"
                        onFilterClear={() => setSearchParam("")}
                        onSearchParamChange={setSearchParam}
                    />
                    <TaskAside query={searchParam} type={type ?? ""}>
                        {children}
                    </TaskAside>
                </Container>
            </section>
        </Layout>
    );
};
export default AppliedLayout;
