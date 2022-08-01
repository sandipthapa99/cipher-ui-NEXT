import SearchBySort from "@components/SearchTask/searchPageSort";
import { ClientTaskCard } from "@components/Task/ClientTaskCard";
import { useClientTasks } from "context/ClientTaskContext";
import { Col, Row } from "react-bootstrap";

import GettingStartedTask from "../Task/GettingStartedCard";
import Post from "./Post";

const ApplyPost = () => {
    const { tasks } = useClientTasks();
    return (
        <div style={{ margin: "2rem 0 0 0 " }}>
            <Row>
                <Col md={8}>
                    <SearchBySort />
                </Col>
            </Row>

            <Row>
                <Col md={8}>
                    {tasks.length > 0 && typeof window !== "undefined" ? (
                        <div className="client-tasks">
                            {tasks.map((task, index) => (
                                <ClientTaskCard key={index} task={task} />
                            ))}
                        </div>
                    ) : null}
                    <Post />
                </Col>
                <Col md={4}>
                    <GettingStartedTask />
                </Col>
            </Row>
        </div>
    );
};
export default ApplyPost;
