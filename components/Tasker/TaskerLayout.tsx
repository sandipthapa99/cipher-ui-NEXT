import {
    useClearSearchedTaskers,
    useClearSearchQuery,
    useSearchQuery,
} from "@components/common/Search/searchStore";
import Layout from "@components/Layout";
import { SearchCategory } from "@components/SearchTask/SearchCategory";
import { Highlight, Space } from "@mantine/core";
import type { ReactNode } from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";

import TaskerAside from "./TaskerAside";

const TaskerLayout = ({
    children,
    title,
    description,
}: {
    children: ReactNode;
    title?: string;
    description?: string;
}) => {
    const [searchParam, setSearchParam] = useState("");
    const clearSearchedTaskers = useClearSearchedTaskers();
    const clearSearchQuery = useClearSearchQuery();
    const searchQuery = useSearchQuery();

    const handleSearchParamChange = (searchParam: string) => {
        // clear the existing search data when searchparam changes and has value
        if (searchParam) {
            clearSearchedTaskers();
            clearSearchQuery();
        }
        setSearchParam(searchParam);
    };
    return (
        <Layout
            title={`${title ? `Taskers | ${title}` : "Find Taskers | Homaale"}`}
        >
            <section className="Tasker-section" id="Tasker-section">
                <Container fluid="xl" className="px-4 pb-5">
                    <SearchCategory
                        searchModal="tasker"
                        onSearchParamChange={handleSearchParamChange}
                        onFilterClear={() => setSearchParam("")}
                    />
                    {searchQuery?.query && (
                        <Highlight highlight={searchQuery.query}>
                            {`Showing search results for ${searchQuery.query}`}
                        </Highlight>
                    )}
                    <Space h={10} />
                    <TaskerAside searchParam={searchParam}>
                        {children}
                    </TaskerAside>
                </Container>
            </section>
        </Layout>
    );
};
export default TaskerLayout;
