import { TeamMembersCard } from "@components/common/TeamMembersCard";
import SkeletonTaskerCard from "@components/Skeletons/SkeletonTaskerCard";
import { ScrollArea } from "@mantine/core";
import Link from "next/link";
import type { ReactNode } from "react";
import { Fragment } from "react";
import { Col, Row } from "react-bootstrap";
import type { TaskerProps } from "types/taskerProps";

interface TaskerAsideProps {
    children: ReactNode;
    tasker: TaskerProps["result"];
    query: string;
}
const TaskerAside = ({ tasker, query, children }: TaskerAsideProps) => {
    const totalAppliedTasks = tasker?.length;
    const renderTaskCards = tasker?.map((tasker, key) => {
        return (
            <div key={key} className="pe-1">
                <Link href={`/tasker/${tasker?.user?.id}`}>
                    <a>
                        <TeamMembersCard
                            // taskers={tasker?.user}
                            tasker={tasker?.user?.id}
                            image={tasker?.profile_image}
                            name={tasker?.full_name}
                            speciality={"Teacher"} //doesnt come from api
                            rating={tasker?.stats?.user_reviews}
                            happyClients={tasker?.stats?.happy_clients}
                            awardPercentage={tasker?.stats?.success_rate}
                            location={
                                tasker?.address_line1 +
                                " " +
                                tasker?.address_line2
                            }
                            distance={"2 km"}
                            bio={tasker?.bio}
                            charge={
                                tasker?.charge_currency +
                                " " +
                                tasker?.hourly_rate
                            }
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
                    <ScrollArea.Autosize
                        maxHeight={700}
                        offsetScrollbars
                        scrollbarSize={5}
                    >
                        <>
                            {query && totalAppliedTasks > 0 ? (
                                <p className="search-results-text">
                                    {`${totalAppliedTasks} service matching ${query} found`}
                                </p>
                            ) : null}

                            {!query && totalAppliedTasks === 0 ? (
                                <Fragment>
                                    {Array.from({ length: 3 }).map((_, key) => (
                                        <SkeletonTaskerCard key={key} />
                                    ))}
                                </Fragment>
                            ) : (
                                renderTaskCards
                            )}
                            {query && totalAppliedTasks === 0 ? (
                                <p className="search-results-text">
                                    No services matching {query} found
                                </p>
                            ) : null}
                        </>
                    </ScrollArea.Autosize>
                </Col>
                <Col md={8}>{children}</Col>
            </Row>
        </div>
    );
};
export default TaskerAside;
