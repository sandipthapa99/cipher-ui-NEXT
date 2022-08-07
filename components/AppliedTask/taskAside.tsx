import Link from "next/link";
import type { ReactNode } from "react";
import { Col, Row } from "react-bootstrap";
import { AllTaskResult } from "types/applytask";
import d
import type { AppliedTask } from "../../staticData/taskApplied";
import TaskAppliedCard from "./taskAppliedCard";

interface TaskAsideProps {
    children: ReactNode;
    appliedTasks: AllTaskResult[];
    query: string;
}
const TaskAside = ({ appliedTasks, query, children }: TaskAsideProps) => {
    const totalAppliedTasks = appliedTasks.length;
    console.log(appliedTasks, "appliedTakssssss");

    const renderTaskCards = appliedTasks.map((task) => {
        return (
            <div key={task.id}>
                <Link href="/task/task-detail">
                    <a>
                        <TaskAppliedCard
                            title={task.title}
                            charge={task.charge}
                            location={task.location}
                            date={ Intl.DateTimeFormat('en-US').format(date)}
                            time={task.time}
                        />
                    </a>
                </Link>
            </div>
        );
    });
    return (
        <div className="search-results">
            <Row>
                <Col md={4} style={{ overflowY: "scroll", maxHeight: "90vh" }}>
                    {query && totalAppliedTasks > 0 ? (
                        <p className="search-results-text">
                            {`${totalAppliedTasks} service matching ${query} found`}
                        </p>
                    ) : null}
                    {query && totalAppliedTasks === 0 ? (
                        <p className="search-results-text">
                            No services matching {query} found
                        </p>
                    ) : null}
                    {renderTaskCards}
                </Col>

                <Col md={8}>{children}</Col>
            </Row>
        </div>
    );
};
export default TaskAside;
