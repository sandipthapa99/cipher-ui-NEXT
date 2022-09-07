import SkeletonTaskCard from "@components/Skeletons/SkeletonTaskCard";
import { faWarning } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, ScrollArea } from "@mantine/core";
import { format } from "date-fns";
import Link from "next/link";
import type { ReactNode } from "react";
import { Fragment } from "react";
import { Col, Row } from "react-bootstrap";
import type { ITask } from "types/task";

import TaskAppliedCard from "./taskAppliedCard";

interface TaskAsideProps {
    children: ReactNode;
    appliedTasks: ITask[];
    query: string;
    type?: string;
}
const TaskAside = ({ appliedTasks, query, children, type }: TaskAsideProps) => {
    const totalAppliedTasks = appliedTasks?.length;
    const renderTaskCards = appliedTasks?.map((task) => {
        return (
            <div key={task?.slug}>
                <Link
                    href={
                        type === "you may like"
                            ? `/task-you-may-like/${task?.slug}`
                            : `/task/${task?.slug}`
                    }
                >
                    <a>
                        <TaskAppliedCard
                            title={task.title}
                            startPrice={task.budget_from}
                            endPrice={task?.budget_to}
                            location={task.location}
                            date={format(
                                new Date(task.created_at),
                                "dd MMM, yyyy"
                            )}
                            time={format(new Date(task.created_at), "HH : mm")}
                            currency={task?.currency?.code}
                            charge={task.charge?.toString() ?? "0"}
                            taskId={task?.slug}
                            budget_type={task?.budget_type}
                        />
                    </a>
                </Link>
            </div>
        );
    });
    return (
        <div className="search-results">
            <Row>
                <Col md={4} className="left">
                    <ScrollArea.Autosize
                        maxHeight={700}
                        offsetScrollbars
                        scrollbarSize={5}
                    >
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
                        {!query && totalAppliedTasks === 0 ? (
                            <Fragment>
                                {Array.from({ length: 4 }).map((_, key) => (
                                    <SkeletonTaskCard key={key} />
                                ))}
                            </Fragment>
                        ) : (
                            renderTaskCards
                        )}
                        {!query && appliedTasks?.length === 0 && (
                            <Alert
                                icon={<FontAwesomeIcon icon={faWarning} />}
                                title="Tasks Unavailable"
                                variant="filled"
                                color="yellow"
                            >
                                No tasks available at the moment{""}
                            </Alert>
                        )}
                    </ScrollArea.Autosize>
                </Col>

                <Col md={8} className="right">
                    {children}
                </Col>
            </Row>
        </div>
    );
};
export default TaskAside;
