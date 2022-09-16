import TaskAside from "@components/AppliedTask/taskAside";
import Layout from "@components/Layout";
import { SearchCategory } from "@components/SearchTask/searchCategory";
import { useQuery } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import type { ITaskApiResponse } from "types/task";
import { axiosClient } from "utils/axiosClient";

export const useSearchTask = (searchQuery: string) => {
    const url = `/task${searchQuery}`;
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
    const [params, setParams] = useState<Record<string, string>>({});
    const searchQuery = useMemo(() => {
        const url = new URL("/task", process.env.NEXT_PUBLIC_API_URL);
        for (const key in params) {
            url.searchParams.append(key, params[key]);
        }
        return url.search;
    }, [params]);

    const { data: searchData = [], isFetching } = useSearchTask(searchQuery);
    return (
        <Layout title="Find Tasks | Cipher">
            <section className="Tasks-section mb-5" id="Tasks-section">
                <Container>
                    <SearchCategory
                        onFilterClear={() => setParams({})}
                        onParamsChange={(params) =>
                            setParams((previousParams) => ({
                                ...previousParams,
                                ...params,
                            }))
                        }
                    />
                    <TaskAside
                        query={searchQuery}
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
