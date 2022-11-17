import SkeletonTaskCard from "@components/Skeletons/SkeletonTaskCard";
import { ScrollArea, Space } from "@mantine/core";
import { useTasks } from "hooks/task/use-tasks";
import { useInViewPort } from "hooks/use-in-viewport";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import { Fragment } from "react";
import { useMemo } from "react";
import { Col, Row } from "react-bootstrap";
import type { ITask } from "types/task";
import { sortItemsByActive } from "utils/sortItemsByActive";

import TaskAppliedCard from "./taskAppliedCard";

interface TaskAsideProps {
    children: ReactNode;
    query: string;
    type?: string;
}
const TaskAside = ({ query, children }: TaskAsideProps) => {
    const router = useRouter();
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

    const sortedTasks = sortItemsByActive<ITask>({
        type: "task",
        tasks: appliedTasks,
        activeId: router.query.id?.toString() as string,
    });
    const { ref } = useInViewPort<HTMLDivElement>(() => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    });

    const renderTasks = () =>
        sortedTasks.map((task, taskIndex) => {
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
                        maxHeight={800}
                        offsetScrollbars
                        scrollbarSize={5}
                    >
                        {query && totalAppliedTasks > 0 ? (
                            <p>{`${totalAppliedTasks} search results found`}</p>
                        ) : query && totalAppliedTasks === 0 ? (
                            <p>{`No search results found for ${query}`}</p>
                        ) : null}
                        {isLoading ? renderLoadingSkeletons() : renderTasks()}
                        <Space h="md" />
                        {isFetchingNextPage ? <SkeletonTaskCard /> : null}
                    </ScrollArea.Autosize>
                </Col>

                <Col md={8} className="right">
                    <ScrollArea.Autosize
                        maxHeight={750}
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
