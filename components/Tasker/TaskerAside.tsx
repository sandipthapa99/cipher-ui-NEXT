import { TeamMembersCard } from "@components/common/TeamMembersCard";
import { TaskerSkeleton } from "@components/Skeletons/TaskerSkeleton";
import { faWarning } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, ScrollArea } from "@mantine/core";
import { useTaskers } from "hooks/tasker/use-taskers";
import { useInViewPort } from "hooks/use-in-viewport";
import type { ReactNode } from "react";
import { useMemo } from "react";
import { Col, Row } from "react-bootstrap";

interface TaskerAsideProps {
    children: ReactNode;
    searchParam: string;
}
const TaskerAside = ({ searchParam, children }: TaskerAsideProps) => {
    const {
        data: taskersPage,
        isLoading,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
    } = useTaskers(searchParam);
    const taskers = useMemo(
        () => taskersPage?.pages.map((page) => page.result).flat() ?? [],
        [taskersPage?.pages]
    );
    const totalTaskers = taskers.length;

    const isLastTaskerOnPage = (index: number) => index === totalTaskers - 1;

    const { ref } = useInViewPort<HTMLDivElement>(() => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    });

    const renderTaskCards = taskers.map((tasker, index) => {
        return (
            <div
                ref={isLastTaskerOnPage(index) ? ref : null}
                key={`${tasker.id}-${index}`}
                className="pe-1"
            >
                <TeamMembersCard
                    isTasker={true}
                    tasker={tasker?.user?.id}
                    image={tasker?.profile_image}
                    name={`${tasker?.user.first_name} ${tasker?.user.middle_name} ${tasker?.user.last_name}`}
                    speciality={"Teacher"} //doesnt come from api
                    rating={tasker?.rating.avg_rating}
                    happyClients={tasker?.stats?.happy_clients}
                    awardPercentage={tasker?.stats?.success_rate}
                    location={tasker?.address_line2}
                    distance={"2 km"}
                    bio={tasker?.bio}
                    charge={
                        tasker?.charge_currency
                            ? `${tasker?.charge_currency.symbol} ${tasker?.hourly_rate}`
                            : `N/A`
                    }
                />
            </div>
        );
    });
    return (
        <div className="search-results">
            <Row>
                <Col md={4}>
                    <ScrollArea.Autosize
                        maxHeight={700}
                        offsetScrollbars
                        scrollbarSize={5}
                    >
                        <>
                            {isLoading && <TaskerSkeleton />}
                            {searchParam && totalTaskers > 0 ? (
                                <p className="search-results-text">
                                    {`${totalTaskers} service matching ${searchParam} found`}
                                </p>
                            ) : null}

                            {renderTaskCards}
                            {!isLoading && !searchParam && totalTaskers === 0 && (
                                <Alert
                                    icon={<FontAwesomeIcon icon={faWarning} />}
                                    title="Taskers Unavailable"
                                    variant="filled"
                                    color="yellow"
                                >
                                    No tasks available at the moment{""}
                                </Alert>
                            )}
                            {searchParam && totalTaskers === 0 ? (
                                <p className="search-results-text">
                                    No services matching {searchParam} found
                                </p>
                            ) : null}
                        </>
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
export default TaskerAside;
