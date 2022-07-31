import TaskCard from "@components/common/TaskCard";
import SearchBySort from "@components/SearchTask/searchPageSort";
import { Col, Row } from "react-bootstrap";

import { tasks } from "../../staticData/task";
import GettingStartedTask from "./GettingStartedCard";

const ApplyTask = () => {
    const renderTasks = () =>
        tasks.map((task, index) => {
            return <TaskCard key={index} {...task} />;
        });
    return (
        <div style={{ margin: "2rem 0 0 0 " }}>
            <Row>
                <Col md={6}>
                    <SearchBySort />
                </Col>
            </Row>

            <Row>
                <Col>
                    <div>{renderTasks()}</div>
                </Col>
                <Col>
                    <div>
                        <GettingStartedTask />
                    </div>
                </Col>
            </Row>
        </div>
    );
};
export default ApplyTask;
