import FullPageLoader from "@components/common/FullPageLoader";
import TaskCard from "@components/common/TaskCard";
import { useTasks } from "hooks/task/use-tasks";
import { Col, Row } from "react-bootstrap";

export const Recommended = () => {
    const { data: taskPages, isLoading } = useTasks();
    const recommendedTasks =
        taskPages?.pages.map((task) => task.result).flat() ?? [];

    if (isLoading) return <FullPageLoader />;
    return (
        <div className="recommended-tab">
            <Row>
                {recommendedTasks?.map((task, key) => (
                    <Col sm="12" key={key}>
                        <TaskCard task={task} />
                    </Col>
                ))}
            </Row>
        </div>
    );
};
