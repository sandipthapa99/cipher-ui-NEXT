import { MapboxMap } from "@components/common/MapboxMap";
import Footer from "@components/Footer";
import Layout from "@components/Layout";
import { SearchCategory } from "@components/SearchTask/searchCategory";
import { UserTaskCardList } from "@components/Task/UserTaskCard/UserTaskCardList";
import UserTaskDetail from "@components/Task/UserTaskDetail/UserTaskDetail";
import { useQuery } from "@tanstack/react-query";
import type { Tasker } from "hooks/tasker/use-tasker";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { axiosClient } from "utils/axiosClient";

const useSearchTaskers = (query: string) => {
    return useQuery(
        ["taskers", query],
        () =>
            axiosClient
                .get<{ result: Tasker[] }>(`/tasker?search=${query}`)
                .then((response) => response.data.result),
        { initialData: [] }
    );
};
const TaskerPage = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const { data: taskers } = useSearchTaskers(searchQuery);
    const { redirectedFrom } = router.query;
    const [activeTaskIdx, setActiveTaskIdx] = useState<string | undefined>();

    const toggleActiveTask = (taskerId: string) => {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, taskerId },
        });
        setActiveTaskIdx(taskerId);
    };

    const removeActiveTaskIdx = () => {
        if (redirectedFrom && typeof redirectedFrom === "string")
            return router.push({
                pathname: redirectedFrom,
                hash: "top-merchants",
            });
        setActiveTaskIdx(undefined);
    };
    useEffect(() => {
        const { taskerId } = router.query;
        if (taskerId !== undefined && typeof taskerId === "string") {
            setActiveTaskIdx(taskerId);
        }
    }, [router.query.taskerId, router.query]);
    return (
        <Layout>
            <Container fluid="xl" className="px-5">
                <SearchCategory onChange={setSearchQuery} />
                <Row className="gx-5">
                    <Col md={4}>
                        <UserTaskCardList
                            onTaskClick={toggleActiveTask}
                            taskers={taskers}
                        />
                    </Col>
                    <Col md={8}>
                        {activeTaskIdx !== undefined ? (
                            <div className="aside-detail-wrapper">
                                <div className="task-detail-container">
                                    <UserTaskDetail
                                        onExitTaskDetail={removeActiveTaskIdx}
                                        activeTaskId={activeTaskIdx}
                                    />
                                </div>
                            </div>
                        ) : (
                            <MapboxMap />
                        )}
                    </Col>
                </Row>
            </Container>
            <Footer />
        </Layout>
    );
};

export default TaskerPage;
