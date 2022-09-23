import SkeletonTaskCard from "@components/Skeletons/SkeletonTaskCard";
import { faWarning } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, ScrollArea } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
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
    isFetching: boolean;
}
const TaskAside = ({
    appliedTasks,
    query,
    children,
    type,
    isFetching,
}: TaskAsideProps) => {
    const totalAppliedTasks = appliedTasks?.length;
    const queryClient = useQueryClient();
    const renderTaskCards = appliedTasks?.map((task) => {
        return (
            <div key={task?.slug}>
                <TaskAppliedCard task={task} type={type} />
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
                        {isFetching && (
                            <Fragment>
                                {Array.from({ length: 4 }).map((_, key) => (
                                    <SkeletonTaskCard key={key} />
                                ))}
                            </Fragment>
                        )}
                        {query && totalAppliedTasks > 0 ? (
                            <p className="search-results-text">
                                {`${totalAppliedTasks} service matching your query found`}
                            </p>
                        ) : null}
                        {query && totalAppliedTasks === 0 ? (
                            <p className="search-results-text">
                                No services matching your query found
                            </p>
                        ) : null}
                        {isFetching ? (
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
                    <ScrollArea.Autosize
                        maxHeight={700}
                        offsetScrollbars
                        scrollbarSize={5}
                    >
                        {children}
                    </ScrollArea.Autosize>
                </Col>
            </Row>
        </div>
    );
};
export default TaskAside;
