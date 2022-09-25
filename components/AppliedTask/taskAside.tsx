import SkeletonTaskCard from "@components/Skeletons/SkeletonTaskCard";
import { Loader, ScrollArea, Space } from "@mantine/core";
import { useTasks } from "hooks/task/use-tasks";
import { useInViewPort } from "hooks/use-in-viewport";
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
const TaskAside = ({ query, children }: TaskAsideProps) => {
    const {
        data: appliedTaskPages,
        isLoading,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
    } = useTasks(query);

    const appliedTasks = useMemo(
        () => appliedTaskPages?.pages.map((page) => page.result).flat() ?? [],
        [appliedTaskPages?.pages]
    );

    const totalAppliedTasks = appliedTasks.length;

    const isLastTaskOnPage = (taskIndex: number) =>
        taskIndex === totalAppliedTasks - 1;

    const { ref } = useInViewPort<HTMLDivElement>(() => {
        if (hasNextPage && !isFetchingNextPage) {
            console.log("FETCHING MORE TASKS");
            fetchNextPage();
        }
    });

    const renderTasks = () =>
        appliedTasks.map((task, taskIndex) => {
            return (
                <div
                    ref={isLastTaskOnPage(taskIndex) ? ref : null}
                    key={task.id}
                >
                    <TaskAppliedCard task={task} />
                </div>
            );
        });
    const renderLoadingSkeletons = () => {
        return (
            <Fragment>
                {Array.from({ length: 4 }).map((_, index) => (
                    <SkeletonTaskCard key={index} />
                ))}
            </Fragment>
        );
    };

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
