import Footer from "@components/Footer";
import Header from "@components/Header";
import { SearchCategory } from "@components/SearchTask/searchCategory";
import SearchHeader from "@components/SearchTask/searchHeader";
import { UserTaskCardList } from "@components/Task/UserTaskCard/UserTaskCardList";
import UserTaskDetail from "@components/Task/UserTaskDetail/UserTaskDetail";
import { useMemo, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { taskDetails } from "staticData/taskDetail";
import { DUMMY_TASKS, Task } from "types/tasks";
import { withAuth } from "utils/Auth/withAuth";

const Tasker = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTaskIdx, setActiveTaskIdx] = useState<number | undefined>();

    const toggleActiveTask = (task: Task) => {
        setActiveTaskIdx(task.id);
    };

    const filteredTasks = useMemo(
        () =>
            searchQuery
                ? DUMMY_TASKS.filter((dummyTask) =>
                      dummyTask.user.username
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
                  )
                : DUMMY_TASKS,
        [searchQuery]
    );
    return (
        <>
            <SearchHeader />
            <Header />
            <Container>
                <SearchCategory onChange={setSearchQuery} />
                <Row>
                    <Col md={4}>
                        <UserTaskCardList
                            onTaskClick={toggleActiveTask}
                            tasks={filteredTasks}
                        />
                    </Col>
                    <Col md={8}>
                        {activeTaskIdx !== undefined ? (
                            <div className="task-detail-container">
                                <UserTaskDetail
                                    taskDetail={taskDetails[activeTaskIdx]}
                                />
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

export default withAuth(Tasker);
