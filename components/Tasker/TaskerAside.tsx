import { TeamMembersCard } from "@components/common/TeamMembersCard";
import { Skeleton, Space } from "@mantine/core";
import Link from "next/link";
import type { ReactNode } from "react";
import { Fragment } from "react";
import { Col, Row } from "react-bootstrap";
import Scrollbars from "react-custom-scrollbars";
import type { TaskerProps } from "types/taskerProps";

interface TaskerAsideProps {
    children: ReactNode;
    tasker: TaskerProps["result"];
    query: string;
    isLoading: boolean;
}
const TaskerAside = ({ tasker, query, children }: TaskerAsideProps) => {
    const totalAppliedTasks = tasker?.length;
    console.log("tskers===", tasker);
    const renderTaskCards = tasker?.map((tasker, key) => {
        return (
            <div key={key}>
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
                            charge_currency={
                                tasker?.charge_currency?.code +
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
                    <Scrollbars autoHide style={{ height: 700 }}>
                        <>
                            {query && totalAppliedTasks > 0 ? (
                                <p className="search-results-text">
                                    {`${totalAppliedTasks} service matching ${query} found`}
                                </p>
                            ) : null}

                            {!query && totalAppliedTasks === 0 ? (
                                <Fragment>
                                    {Array.from({ length: 3 }).map((_, key) => (
                                        <div
                                            className="mantine-Skeleton mb-5 p-5"
                                            key={key}
                                        >
                                            <div className="d-flex justify-content-between">
                                                <Skeleton
                                                    height={60}
                                                    circle
                                                    mb="xl"
                                                />
                                                <Skeleton
                                                    height={60}
                                                    width="70%"
                                                    mb="xl"
                                                />
                                            </div>
                                            <Space h={5} />
                                            <Skeleton
                                                height={20}
                                                mt={6}
                                                width="70%"
                                                radius="xl"
                                            />
                                            <Space h={20} />
                                            <Skeleton
                                                height={30}
                                                mt={6}
                                                radius="xl"
                                            />
                                        </div>
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
                    </Scrollbars>
                </Col>
                <Col md={8}>{children}</Col>
            </Row>
        </div>
    );
};
export default TaskerAside;
