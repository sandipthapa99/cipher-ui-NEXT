import FullPageLoader from "@components/common/FullPageLoader";
import TaskCard from "@components/common/TaskCard";
import SearchBySort from "@components/SearchTask/searchPageSort";
import { useTasks } from "hooks/apply-task/useTask";
import { Col, Row } from "react-bootstrap";

import { tasks } from "../../staticData/task";
import GettingStartedTask from "./GettingStartedCard";
const ApplyTask = () => {
    const { data: recommendedTasks, isLoading } = useTasks();
    console.log("tasks data=", recommendedTasks);
    if (isLoading || !recommendedTasks) return <FullPageLoader />;
    const renderTasks = () =>
        recommendedTasks?.result?.map((task: any) => {
            // return <TaskCard key={index} {...task} />;
            return (
                <TaskCard
                    key={task?.id}
                    title={task?.title}
                    id={task?.id}
                    charge={task?.charge}
                    description={task?.description}
                    location={task?.location}
                    start_date={task?.start_date}
                    start_time={task?.start_time}
                    status={task?.status}
                    currency={task?.currency}
                />
            );
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
