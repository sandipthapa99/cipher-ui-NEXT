import {
    useClearSearchedServices,
    useClearSearchQuery,
    useSearchQuery,
} from "@components/common/Search/searchStore";
import Layout from "@components/Layout";
import { SearchCategory } from "@components/SearchTask/searchCategory";
import { Highlight, Space } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
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
    const [sortTaskerPrice, setSortTaskerPrice] = useState([]);
    const searchQuery = useSearchQuery();

    const { data: searchData = [], isFetching } = useSearchTasker(query);
    return (
        <Layout title="Find Tasker | Cipher">
            <section className="Tasker-section" id="Tasker-section">
                <Container fluid="xl">
                    {/* <SearchCategory
                        onChange={handleSearchChange}
                        getTaskerBySort={getTaskerSortByPrice}
                    /> */}
                    {searchQuery?.query && (
                        <Highlight highlight={searchQuery.query}>
                            {`Showing search results for ${searchQuery.query}`}
                        </Highlight>
                    )}
                    <Space h={10} />
                    <TaskerAside
                        query={query}
                        tasker={
                            sortTaskerPrice.length > 0
                                ? sortTaskerPrice
                                : searchData
                        }
                        isLoading={isFetching}
                    >
                        {children}
                    </TaskerAside>
                </Container>
            </section>
        </Layout>
    );
};
export default TaskerLayout;
