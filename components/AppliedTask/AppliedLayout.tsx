import TaskAside from "@components/AppliedTask/taskAside";
import Layout from "@components/Layout";
import { SearchCategory } from "@components/SearchTask/SearchCategory";
import { useQuery } from "@tanstack/react-query";
import urls from "constants/urls";
import { debounce } from "lodash";
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
    description,
    keywords,
    ogImage,
    ogUrl,
}: {
    children: ReactNode;
    type?: string;
    title?: string;
    description?: string;
    keywords?: string;
    ogImage?: string;
    ogUrl?: string;
}) => {
    const [searchParam, setSearchParam] = useState("");
    return (
        <Layout
            title={`Homaale | ${title ? title : `Find Tasks`}`}
            description={
                description
                    ? description
                    : "Browse task in Homaale and book a task to earn and enjoy many more advantages"
            }
            keywords={keywords ? keywords : "homaale-task"}
            ogImage={ogImage}
            ogUrl={ogUrl}
        >
            <section className="tasks-section mb-5" id="tasks-section">
                <Container fluid="xl" className="px-4 pb-5">
                    <SearchCategory
                        searchModal="task"
                        onFilterClear={() => setSearchParam("")}
                        onSearchParamChange={debounce(setSearchParam, 500)}
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
