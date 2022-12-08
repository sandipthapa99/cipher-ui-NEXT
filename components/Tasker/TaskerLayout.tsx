import {
    useClearSearchedTaskers,
    useClearSearchQuery,
    useSearchQuery,
} from "@components/common/Search/searchStore";
import Layout from "@components/Layout";
import { SearchCategory } from "@components/SearchTask/SearchCategory";
import { Highlight, Space } from "@mantine/core";
import { debounce } from "lodash";
import type { ReactNode } from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";

import TaskerAside from "./TaskerAside";

const TaskerLayout = ({
    children,
    title,
    description,
    ogUrl,
    ogImage,
    keywords,
}: {
    children: ReactNode;
    title?: string;
    description?: string;
    keywords?: string;
    ogImage?: string;
    ogUrl?: string;
}) => {
    const [searchParam, setSearchParam] = useState("");
    const clearSearchedTaskers = useClearSearchedTaskers();
    const clearSearchQuery = useClearSearchQuery();
    const searchQuery = useSearchQuery();

    const handleSearchParamChange = debounce((searchParam: string) => {
        // clear the existing search data when searchparam changes and has value
        if (searchParam) {
            clearSearchedTaskers();
            clearSearchQuery();
        }
        setSearchParam(searchParam);
    }, 500);
    return (
        <Layout
            title={`${title ? `Taskers | ${title}` : "Find Taskers | Homaale"}`}
            description={
                description
                    ? description
                    : "Browse tasker in Homaale and find the tasker who might be helpful to you"
            }
            keywords={keywords ? keywords : "homaale-tasker"}
            ogImage={ogImage}
            ogUrl={ogUrl}
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
