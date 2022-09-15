import { TeamMembersCard } from "@components/common/TeamMembersCard";
import { faWarning } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert } from "@mantine/core";
import React from "react";
import { Col, Row } from "react-bootstrap";
import type { TaskApplicantsProps } from "types/task";

export const TaskersTab = ({
    taskApplicants,
}: {
    taskApplicants: TaskApplicantsProps;
}) => {
    return (
        <div className="tasker-tab-taskdetail">
            <Row className="g-5">
                {taskApplicants && taskApplicants.result.length <= 0 && (
                    <Alert
                        icon={<FontAwesomeIcon icon={faWarning} />}
                        title="No Applicants!"
                        color="orange"
                    >
                        There are no applicants yet!
                    </Alert>
                )}
                {taskApplicants &&
                    taskApplicants?.result?.map((item, key) => (
                        <Col md={12} lg={6} key={key}>
                            <TeamMembersCard
                                collabButton={false}
                                image={item?.user?.profile_image}
                                name={item?.user.full_name}
                                speciality={"curry"}
                                rating={item?.user?.rating.avg_rating}
                                happyClients={item?.user?.stats?.happy_clients}
                                awardPercentage={
                                    item?.user?.stats?.task_completed
                                }
                                location={`${item?.user?.address_line1}, ${item?.user?.address_line2}`}
                                distance={"2 km"}
                                bio={item?.user?.bio}
                                charge={`${item?.user?.charge_currency.code} ${item?.user?.hourly_rate}`}
                                tasker={""}
                            />
                        </Col>
                    ))}
            </Row>
        </div>
    );
};
