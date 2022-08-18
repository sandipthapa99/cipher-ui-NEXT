import Footer from "@components/Footer";
import Header from "@components/Header";
import { SearchCategory } from "@components/SearchTask/searchCategory";
import SearchHeader from "@components/SearchTask/searchHeader";
import { UserTaskCardList } from "@components/Task/UserTaskCard/UserTaskCardList";
import UserTaskDetail from "@components/Task/UserTaskDetail/UserTaskDetail";
import { useTaskers } from "hooks/tasker/use-tasker";
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
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.964085347331!2d85.32581651504847!3d27.687504882800226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19095c0dfbe9%3A0xeabd594ec46dbdfb!2sCagtu%20Nepal!5e0!3m2!1sen!2snp!4v1658661530376!5m2!1sen!2snp"
                                width="100%"
                                height="450"
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="ml-4"
                            />
                        )}
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
};

export default Tasker;
