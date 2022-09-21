import { TeamMembersCard } from "@components/common/TeamMembersCard";
import { faWarning } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert } from "@mantine/core";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import urls from "constants/urls";
import { useData } from "hooks/use-data";
import type { GetStaticProps } from "next";
import React from "react";
import { Col, Row } from "react-bootstrap";
import type { TaskApplicantsProps } from "types/task";
import { axiosClient } from "utils/axiosClient";

export const TaskersTab = () => {
    const { data: taskApplicants } = useData<TaskApplicantsProps>(
        ["get-my-applicants"],
        `${urls.task.my_applicants}`
    );
    // console.log(
    //     "🚀 ~ file: AppliedTaskDetail.tsx ~ line 87 ~ taskApplicants",
    //     taskApplicants?.data?.result
    // );

    return (
        <div className="tasker-tab-taskdetail">
            <Row className="g-5">
                {taskApplicants && taskApplicants?.data.result?.length <= 0 && (
                    <Alert
                        icon={<FontAwesomeIcon icon={faWarning} />}
                        title="No Applicants!"
                        color="orange"
                    >
                        There are no applicants yet!
                    </Alert>
                )}
                {taskApplicants?.data.result &&
                    taskApplicants.data.result.map((item: any) => (
                        <Col md={12} lg={6} key={item.id}>
                            <TeamMembersCard
                                collabButton={false}
                                id={item.id}
                                image={
                                    item ? item.created_by.profile_image : ""
                                }
                                name={
                                    item ? item.created_by.user.full_name : ""
                                }
                                speciality={"curry"}
                                rating={
                                    item
                                        ? item.created_by?.rating.avg_rating
                                        : 0
                                }
                                happyClients={
                                    item
                                        ? item.created_by?.stats?.happy_clients
                                        : ""
                                }
                                awardPercentage={
                                    item
                                        ? item.created_by?.stats?.task_completed
                                        : ""
                                }
                                location={
                                    item
                                        ? `${item?.created_by?.address_line1}, ${item?.created_by?.address_line2}`
                                        : ""
                                }
                                distance={"2 km"}
                                bio={item ? item?.created_by?.bio : ""}
                                charge={
                                    item
                                        ? `${item?.created_by?.charge_currency.code} ${item?.created_by?.hourly_rate}`
                                        : ""
                                }
                                tasker={""}
                            />
                        </Col>
                    ))}
            </Row>
        </div>
    );
};
export const getStaticProps: GetStaticProps = async () => {
    try {
        const { data: taskApplicants } =
            await axiosClient.get<TaskApplicantsProps>(
                `${urls.task.my_applicants}`
            );

        const queryClient = new QueryClient();
        await queryClient.prefetchQuery(["get-my-applicants"]);

        return {
            props: {
                taskApplicants,
                dehydratedState: dehydrate(queryClient),
            },
            revalidate: 10,
        };
    } catch (err: any) {
        return {
            props: {
                taskApplicants: [],
            },
            revalidate: 10,
        };
    }
};
