import {
    useClearSearchedServices,
    useClearSearchQuery,
    useSearchQuery,
} from "@components/common/Search/searchStore";
import Layout from "@components/Layout";
import { SearchCategory } from "@components/SearchTask/searchCategory";
import { Highlight, Space } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useData } from "hooks/use-data";
import type { ReactNode } from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import type { TaskerProps } from "types/taskerProps";
import { axiosClient } from "utils/axiosClient";

import TaskerAside from "./TaskerAside";

export const useSearchTasker = (query: string) => {
    return useQuery(["all-tasker", query], () =>
        axiosClient
            .get<TaskerProps>(`/tasker/?search=${query}`)
            .then((response) => response.data.result)
    );
};

const TaskerLayout = ({ children }: { children: ReactNode }) => {
    const [query, setQuery] = useState("");
    const clearSearchQuery = useClearSearchQuery();
    const clearSearchedServices = useClearSearchedServices();
    const searchQuery = useSearchQuery();

    const { data, isLoading } = useData<TaskerProps>(
        ["all-tasker"],
        "/tasker/"
    );

    const { data: searchData = [] } = useSearchTasker(query);
    const handleSearchChange = (query: string) => {
        clearSearchQuery();
        clearSearchedServices();
        setQuery(query);
    };

    return (
        <Layout title="Find Tasker | Cipher">
            <Container fluid="xl">
                <SearchCategory onChange={handleSearchChange} />
                {searchQuery?.query && (
                    <Highlight highlight={searchQuery.query}>
                        {`Showing search results for ${searchQuery.query}`}
                    </Highlight>
                )}
                <Space h={10} />
                <TaskerAside
                    query={query}
                    tasker={searchData}
                    isLoading={isLoading || !data}
                >
                    {children}
                </TaskerAside>
            </Container>
        </Layout>
    );
};
export default TaskerLayout;
