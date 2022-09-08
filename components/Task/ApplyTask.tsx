import TaskCard from "@components/common/TaskCard";
import SearchBySort from "@components/SearchTask/searchPageSort";
import { useData } from "hooks/use-data";
import { Col, Row } from "react-bootstrap";
import type { ITaskApiResponse } from "types/task";

import GettingStartedTask from "./GettingStartedCard";
const ApplyTask = () => {
    //for tasks

    const { data: recommendedTasks } = useData<ITaskApiResponse>(
        ["all-tasks"],
        "/task/"
    );
    const renderTasks = () =>
        recommendedTasks?.data?.result?.map((task: any, index) => {
            // return <TaskCard key={index} {...task} />;
            return <TaskCard key={index} task={task} />;
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
