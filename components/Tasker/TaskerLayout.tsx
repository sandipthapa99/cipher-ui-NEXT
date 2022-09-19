import { useSearchQuery } from "@components/common/Search/searchStore";
import Layout from "@components/Layout";
import { SearchCategory } from "@components/SearchTask/searchCategory";
import { Highlight, Space } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import urls from "constants/urls";
import type { ReactNode } from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import type { TaskerProps } from "types/taskerProps";
import { axiosClient } from "utils/axiosClient";

import TaskerAside from "./TaskerAside";

export const useSearchTasker = (searchParam: string) => {
    return useQuery(["all-tasker", searchParam], () =>
        axiosClient
            .get<TaskerProps>(`${urls.tasker.list}?${searchParam}`)
            .then((response) => response.data.result)
    );
};

const TaskerLayout = ({ children }: { children: ReactNode }) => {
    const [searchParam, setSearchParam] = useState("");
    const searchQuery = useSearchQuery();

    const { data: searchData = [], isFetching } = useSearchTasker(searchParam);
    return (
        <Layout title="Find Tasker | Cipher">
            <section className="Tasker-section" id="Tasker-section">
                <Container fluid="xl">
                    <SearchCategory
                        searchModal="tasker"
                        onSearchParamChange={setSearchParam}
                        onFilterClear={() => setSearchParam("")}
                    />
                    {searchQuery?.query && (
                        <Highlight highlight={searchQuery.query}>
                            {`Showing search results for ${searchQuery.query}`}
                        </Highlight>
                    )}
                    <Space h={10} />
                    <TaskerAside
                        query={searchParam}
                        tasker={searchData}
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
