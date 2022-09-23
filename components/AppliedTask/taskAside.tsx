import SkeletonTaskCard from "@components/Skeletons/SkeletonTaskCard";
import { faWarning } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, ScrollArea } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { Fragment } from "react";
import { useMemo } from "react";
import { Col, Row } from "react-bootstrap";

import TaskAppliedCard from "./taskAppliedCard";

interface TaskAsideProps {
    children: ReactNode;
    query: string;
    type?: string;
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
                        {query && totalAppliedTasks > 0 ? (
                            <p>{`${totalAppliedTasks} task matching ${query} found`}</p>
                        ) : query && totalAppliedTasks === 0 ? (
                            <p>{`No tasks matching ${query} found`}</p>
                        ) : null}
                        {isLoading ? renderLoadingSkeletons() : renderTasks()}
                        <Space h="md" />
                        {isFetchingNextPage ? <Loader /> : null}
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
