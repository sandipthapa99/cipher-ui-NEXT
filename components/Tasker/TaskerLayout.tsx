import { useSearchQuery } from "@components/common/Search/searchStore";
import Layout from "@components/Layout";
import { SearchCategory } from "@components/SearchTask/searchCategory";
import { Highlight, Space } from "@mantine/core";
import type { ReactNode } from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";

import TaskerAside from "./TaskerAside";

const TaskerLayout = ({ children }: { children: ReactNode }) => {
    const [searchParam, setSearchParam] = useState("");
    const searchQuery = useSearchQuery();

    return (
        <Layout title="Find Tasker | Cipher">
            <section className="Tasker-section" id="Tasker-section">
                <Container fluid="xl" className="px-5">
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
                    <TaskerAside searchParam={searchParam}>
                        {children}
                    </TaskerAside>
                </Container>
            </section>
        </Layout>
    );
};
export default TaskerLayout;
