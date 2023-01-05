import { TeamMembersCard } from "@components/common/TeamMembersCard";
import SkeletonServiceCard from "@components/Skeletons/SkeletonServiceCard";
import { TaskerSkeleton } from "@components/Skeletons/TaskerSkeleton";
import { faWarning } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, ScrollArea } from "@mantine/core";
import { ErrorOutlineOutlined } from "@mui/icons-material";
import { useSearchedTaskers } from "components/common/Search/searchStore";
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
    const searchedTaskers = useSearchedTaskers();
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
    const allTaskers = searchedTaskers.length > 0 ? searchedTaskers : taskers;

    const isLastTaskerOnPage = (index: number) => index === totalTaskers - 1;

    const { ref } = useInViewPort<HTMLDivElement>(() => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    });

    const renderTaskCards = allTaskers.map((tasker, index) => {
        return (
            <div
                ref={isLastTaskerOnPage(index) ? ref : null}
                key={`${tasker.id}-${index}`}
                className="pe-1"
            >
                <TeamMembersCard
                    isTasker={true}
                    tasker={tasker?.user?.id}
                    image={
                        tasker?.profile_image
                            ? tasker?.profile_image
                            : tasker?.avatar?.image
                    }
                    name={`${tasker?.user.first_name} ${
                        tasker?.user.middle_name ?? ""
                    } ${tasker?.user.last_name}`}
                    speciality={tasker?.designation} //doesnt come from api
                    rating={tasker?.rating.avg_rating}
                    happyClients={tasker?.stats?.happy_clients}
                    awardPercentage={
                        +tasker?.stats?.success_rate.toFixed(2) + "%"
                    }
                    location={tasker?.address_line2}
                    distance={"2 km"}
                    bio={tasker?.bio}
                    charge={
                        tasker?.charge_currency.symbol
                            ? `${tasker?.charge_currency.symbol} ${tasker?.hourly_rate}`
                            : ``
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
                        maxHeight={850}
                        offsetScrollbars
                        scrollbarSize={5}
                    >
                        <>
                            {isLoading && <TaskerSkeleton />}
                            {searchParam && totalTaskers > 0 ? (
                                <p className="search-results-text">
                                    {`${totalTaskers} search results found`}
                                </p>
                            ) : null}

                            {renderTaskCards}
                            {!isLoading && !searchParam && totalTaskers === 0 && (
                                <Alert
                                    icon={<ErrorOutlineOutlined />}
                                    title="Taskers Unavailable"
                                    variant="filled"
                                    color="yellow"
                                >
                                    No taskers available.{""}
                                </Alert>
                            )}
                            {searchParam && totalTaskers === 0 ? (
                                <p className="search-results-text">
                                    No search results found
                                    {/* {`No taskers matching "${searchParam.substring(
                                        searchParam.indexOf("=") + 1,
                                        searchParam.length
                                    )}" found.`} */}
                                </p>
                            ) : null}
                            {isFetchingNextPage && <SkeletonServiceCard />}
                        </>
                    </ScrollArea.Autosize>
                </Col>
                <Col md={8} className="right">
                    <ScrollArea style={{ height: 850 }} scrollbarSize={5}>
                        <div style={{ width: 850 }}>{children}</div>
                    </ScrollArea>
                </Col>
            </Row>
        </div>
    );
};
export default TaskerAside;
