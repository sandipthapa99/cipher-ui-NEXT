import { ApplicantsCard } from "@components/common/ApplicantsCard";
import { faWarning } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, Loader } from "@mantine/core";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import urls from "constants/urls";
import { useGetProfile } from "hooks/profile/useGetProfile";
// import type { MyBookings } from "hooks/task/use-get-service-booking";
import { useData } from "hooks/use-data";
import type { GetStaticProps } from "next";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import type { TaskApplicantsProps } from "types/task";
import { axiosClient } from "utils/axiosClient";

export const TaskersTab = ({ taskId }: { taskId: string }) => {
    const [entityServiceId, setEntityServiceId] = useState<string | undefined>(
        ""
    );

    useEffect(() => {
        if (taskId) {
            setEntityServiceId(taskId);
        }
    }, [taskId, setEntityServiceId, entityServiceId]);
    const istaskId = () => {
        if (taskId === undefined) {
            return false;
        }
        return true;
    };

    const {
        data: taskApplicants,
        error: Error,
        isLoading: TaskApplicantLoading,
    } = useData<TaskApplicantsProps>(
        ["get-my-applicants", entityServiceId],
        `${urls.task.my_applicants}?entity_service=${taskId}&is_requested=true`,
        istaskId()
    );

    const { data: profileDetails } = useGetProfile();

    // const requestedTask = Error
    //     ? true
    //     : taskApplicants?.data.result.find(
    //           (requestedTask: any) =>
    //               requestedTask?.entity_service.created_by.id ===
    //               profileDetails?.user.id
    //       );

    return (
        <div className="tasker-tab-taskdetail">
            {Error ? (
                <Alert
                    icon={<FontAwesomeIcon icon={faWarning} />}
                    title={""}
                    color="orange"
                >
                    {`You can't view the applicants`}
                </Alert>
            ) : TaskApplicantLoading ? (
                <Loader />
            ) : !Error ? (
                <Alert
                    icon={<FontAwesomeIcon icon={faWarning} />}
                    title={""}
                    color="orange"
                >
                    {"There are no applicants yet"}
                </Alert>
            ) : (
                <Row className="g-5">
                    {taskApplicants &&
                        taskApplicants.data.result.map((item: any) =>
                            item.is_active ? (
                                <Col
                                    md={12}
                                    lg={12}
                                    xl={12}
                                    xxl={6}
                                    key={item.id}
                                >
                                    <ApplicantsCard
                                        collabButton={false}
                                        id={item.id}
                                        //  bookingId={}
                                        image={
                                            item?.created_by?.profile_image
                                                ? item?.created_by
                                                      ?.profile_image
                                                : item?.created_by?.avatar
                                                      ?.image
                                        }
                                        name={
                                            item
                                                ? item.created_by.user
                                                      .first_name +
                                                  " " +
                                                  item.created_by.user.last_name
                                                : ""
                                        }
                                        speciality={item.created_by.designation}
                                        rating={
                                            item.created_by?.rating
                                                ? item.created_by?.rating
                                                      .avg_rating
                                                : 0
                                        }
                                        happyClients={
                                            item
                                                ? item.created_by?.stats
                                                      ?.happy_clients
                                                : ""
                                        }
                                        awardPercentage={
                                            item
                                                ? item.created_by?.stats
                                                      ?.task_completed
                                                : ""
                                        }
                                        location={
                                            item.created_by?.address_line1
                                                ? `${item?.created_by?.address_line1}, ${item?.created_by?.country?.name}`
                                                : ""
                                        }
                                        distance={"2 km"}
                                        bio={item ? item?.created_by.bio : ""}
                                        charge={
                                            item
                                                ? `${item?.created_by?.charge_currency?.symbol} ${item?.created_by?.hourly_rate}`
                                                : ""
                                        }
                                        // charge={
                                        //     item ? `${item?.budget_to}` : ""
                                        // }
                                        taskId={taskId}
                                        tasker={
                                            item ? item.created_by?.user.id : ""
                                        }
                                        isTasker={false}
                                    />
                                </Col>
                            ) : null
                        )}
                </Row>
            )}
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
        queryClient.invalidateQueries(["get-my-applicants"]);
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
