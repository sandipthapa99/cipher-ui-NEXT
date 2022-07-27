import { useSearchContext } from "context/searchContext";
import Link from "next/link";
import { ReactNode } from "react";
import { Col, Row } from "react-bootstrap";

import { taskApplied } from "../../staticData/taskApplied";
import TaskAppliedCard from "./taskAppliedCard";

const TaskAside = ({ children }: { children: ReactNode }) => {
    const { state } = useSearchContext();

    const filteredServices = taskApplied.filter((task) =>
        task.title
            .split(" ")
            .join("")
            .toLowerCase()
            .includes(state.toLowerCase())
    );

    const renderTaskCards = filteredServices.map((task) => {
        return (
            <div key={task.id}>
                <Link href="/task/task-detail">
                    <a>
                        <TaskAppliedCard
                            title={task.title}
                            charge={task.charge}
                            location={task.location}
                            date={task.date}
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
                <Col md={4} style={{ overflowY: "scroll", maxHeight: "175vh" }}>
                    <p
                        style={{
                            fontSize: "12px",
                            color: "#495057",
                            lineHeight: "18px",
                        }}
                    >
                        {filteredServices.length} {state} Services in Kathmandu,
                        Nepal (1 new)
                    </p>
                    {renderTaskCards}
                </Col>

                <Col md={8}>{children}</Col>
            </Row>
        </div>
    );
};
export default TaskAside;
