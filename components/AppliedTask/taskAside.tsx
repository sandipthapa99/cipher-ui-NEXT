import { faWarning } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, Divider, Skeleton } from "@mantine/core";
import { format } from "date-fns";
import Link from "next/link";
import type { ReactNode } from "react";
import { Fragment } from "react";
import { Col, Row } from "react-bootstrap";
import Scrollbars from "react-custom-scrollbars";
import type { ITask } from "types/task";

import TaskAppliedCard from "./taskAppliedCard";

interface TaskAsideProps {
    children: ReactNode;
    appliedTasks: ITask[];
    query: string;
    type?: string;
    isLoading?: boolean;
}
const TaskAside = ({
    appliedTasks,
    query,
    children,
    type,
    isLoading,
}: TaskAsideProps) => {
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
                            currency={task?.currency}
                            charge={task.charge?.toString() ?? "0"}
                            taskId={task?.slug}
                        />
                    </a>
                </Link>
            </div>
        );
    });
    return (
        <div className="search-results">
            <Row>
                <Col md={4}>
                    <Scrollbars autoHide style={{ height: 700 }}>
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
                                    <div
                                        className="mantine-Skeleton mb-5 p-5"
                                        key={key}
                                    >
                                        <div className="d-flex justify-content-between mb-3">
                                            <Skeleton
                                                height={50}
                                                width={"20%"}
                                                mt={6}
                                            />
                                            <Skeleton
                                                height={20}
                                                mt={6}
                                                radius="xl"
                                                width={"60%"}
                                            />
                                        </div>
                                        <Skeleton
                                            height={20}
                                            mt={6}
                                            radius="xl"
                                            width={"40%"}
                                            className="mb-3"
                                        />
                                        <Skeleton
                                            height={20}
                                            mt={6}
                                            radius="xl"
                                        />
                                        <Divider my={"xl"} color="#F1F3F5" />
                                        <Skeleton
                                            height={20}
                                            mt={6}
                                            width={"60%"}
                                            radius="xl"
                                        />
                                    </div>
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
                    </Scrollbars>
                </Col>

                <Col md={8}>{children}</Col>
            </Row>
        </div>
    );
};
export default TaskAside;
