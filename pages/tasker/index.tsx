import { MapboxMap } from "@components/common/MapboxMap";
import Footer from "@components/Footer";
import Header from "@components/Header";
import { SearchCategory } from "@components/SearchTask/searchCategory";
import SearchHeader from "@components/SearchTask/searchHeader";
import { UserTaskCardList } from "@components/Task/UserTaskCard/UserTaskCardList";
import UserTaskDetail from "@components/Task/UserTaskDetail/UserTaskDetail";
import { useTaskerCoordinates, useTaskers } from "hooks/tasker/use-tasker";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { taskDetails } from "staticData/taskDetail";
import type { Task } from "types/tasks";

const Tasker = () => {
    const router = useRouter();
    const { data: taskers = [] } = useTaskers();
    const { redirectedFrom } = router.query;
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTaskIdx, setActiveTaskIdx] = useState<number | undefined>();

    const taskerCoordinates = useTaskerCoordinates();

    const toggleActiveTask = (task: Task) => {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, taskId: task.id },
        });
        setActiveTaskIdx(task.id);
    };
    const removeActiveTaskIdx = () => {
        if (redirectedFrom && typeof redirectedFrom === "string")
            return router.push({
                pathname: redirectedFrom,
                hash: "top-merchants",
            });
        setActiveTaskIdx(undefined);
    };

    const filteredTasks = useMemo(
        () =>
            searchQuery
                ? taskers.filter((task) =>
                      task.user.username
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
                  )
                : taskers,
        [searchQuery, taskers]
    );
    useEffect(() => {
        const { taskId } = router.query;
        if (taskId !== undefined && !isNaN(Number(taskId))) {
            setActiveTaskIdx(Number(taskId));
        }
    }, [router.query, router.query.taskId]);
    return (
        <>
            <SearchHeader />
            <Header />
            <Container fluid="xl" className="px-5">
                <SearchCategory onChange={setSearchQuery} />
                <Row className="gx-5">
                    <Col md={4}>
                        <UserTaskCardList
                            onTaskClick={toggleActiveTask}
                            tasks={filteredTasks}
                        />
                    </Col>
                    <Col md={8}>
                        {activeTaskIdx !== undefined ? (
                            <div className="aside-detail-wrapper">
                                <div className="task-detail-container">
                                    <UserTaskDetail
                                        onExitTaskDetail={removeActiveTaskIdx}
                                        taskDetail={taskDetails[activeTaskIdx]}
                                        activeTaskId={activeTaskIdx}
                                    />
                                </div>
                            </div>
                        ) : (
                            <MapboxMap markerCoordinates={taskerCoordinates} />
                        )}
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
};

export default Tasker;
