import { TeamMembersCard } from "@components/common/TeamMembersCard";
import SkeletonTaskerCard from "@components/Skeletons/SkeletonTaskerCard";
import { faWarning } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, ScrollArea } from "@mantine/core";
import Link from "next/link";
import type { ReactNode } from "react";
import { Fragment } from "react";
import { Col, Row } from "react-bootstrap";
import type { TaskerProps } from "types/taskerProps";

interface TaskerAsideProps {
    children: ReactNode;
    tasker: TaskerProps["result"];
    query: string;
    isLoading: boolean;
}
const TaskerAside = ({
    tasker,
    query,
    children,
    isLoading,
}: TaskerAsideProps) => {
    const totalAppliedTasks = tasker?.length;
    const renderTaskCards = tasker?.map((tasker, key) => {
        return (
            <div key={key} className="pe-1">
                <TeamMembersCard
                    // taskers={tasker?.user}
                    tasker={tasker?.user?.id}
                    image={tasker?.profile_image}
                    name={tasker?.full_name}
                    speciality={"Teacher"} //doesnt come from api
                    rating={tasker?.rating.avg_rating}
                    happyClients={tasker?.stats?.happy_clients}
                    awardPercentage={tasker?.stats?.success_rate}
                    location={
                        tasker?.address_line1 + " " + tasker?.address_line2
                    }
                    distance={"2 km"}
                    bio={tasker?.bio}
                    charge={
                        tasker?.charge_currency
                            ? `Rs ${tasker?.hourly_rate}`
                            : `$ ${tasker?.hourly_rate}`
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
                        maxHeight={750}
                        offsetScrollbars
                        scrollbarSize={5}
                    >
                        <>
                            {isLoading && (
                                <Fragment>
                                    {Array.from({ length: 3 }).map((_, key) => (
                                        <SkeletonTaskerCard key={key} />
                                    ))}
                                </Fragment>
                            )}
                            {query && totalAppliedTasks > 0 ? (
                                <p className="search-results-text">
                                    {`${totalAppliedTasks} service matching ${query} found`}
                                </p>
                            ) : null}

                            {renderTaskCards}
                            {!isLoading && !query && totalAppliedTasks === 0 && (
                                <Alert
                                    icon={<FontAwesomeIcon icon={faWarning} />}
                                    title="Taskers Unavailable"
                                    variant="filled"
                                    color="yellow"
                                >
                                    No tasks available at the moment{""}
                                </Alert>
                            )}
                            {query && totalAppliedTasks === 0 ? (
                                <p className="search-results-text">
                                    No services matching {query} found
                                </p>
                            ) : null}
                        </>
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
export default TaskerAside;
