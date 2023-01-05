import { ApplicantCard } from "@components/SearchTask/ApplicantCard";
import { faWarning } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, Loader } from "@mantine/core";
import { ErrorOutlineOutlined } from "@mui/icons-material";
import { useGetMyBookings } from "hooks/task/use-get-service-booking";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

export const TaskersTab = ({
    taskId,
    count,
}: {
    taskId: string;
    count: number;
}) => {
    const [entityServiceId, setEntityServiceId] = useState<string | undefined>(
        ""
    );

    useEffect(() => {
        if (taskId) {
            setEntityServiceId(taskId);
        }
    }, [taskId, setEntityServiceId, entityServiceId]);

    const {
        data: taskApplicants,
        isFetching: TaskApplicantLoading,
        isError: Error,
    } = useGetMyBookings(taskId, count ?? 0);

    return (
        <div className="tasker-tab-taskdetail">
            {Error ? (
                <Alert
                    icon={<ErrorOutlineOutlined />}
                    title={""}
                    color="orange"
                >
                    {`There are no applicants yet`}
                </Alert>
            ) : TaskApplicantLoading ? (
                <Loader />
            ) : (
                <>
                    {taskApplicants ? (
                        <Row className="g-5">
                            {taskApplicants?.result.map((item) =>
                                item.is_active ? (
                                    <Col
                                        md={12}
                                        lg={12}
                                        xl={12}
                                        xxl={6}
                                        key={item.id}
                                    >
                                        <ApplicantCard
                                            bookingId={item?.id}
                                            collabButton={false}
                                            image={
                                                item?.created_by?.profile_image
                                                    ? item?.created_by
                                                          ?.profile_image
                                                    : item?.created_by?.avatar
                                                          ?.image
                                            }
                                            name={`${item?.created_by?.user?.first_name} ${item?.created_by?.user?.last_name}`}
                                            rating={
                                                item?.created_by?.rating
                                                    ?.user_rating_count
                                            }
                                            happyClients={
                                                item?.created_by?.stats
                                                    ?.happy_clients
                                            }
                                            awardPercentage={10}
                                            location={
                                                item?.created_by?.address_line1
                                            }
                                            distance={""}
                                            bio={item?.created_by?.bio}
                                            charge={
                                                item?.entity_service
                                                    ?.discount_value
                                            }
                                            tasker={item?.created_by?.user.id}
                                            isApproved={item?.is_accepted}
                                            designation={
                                                item?.created_by.designation
                                            }
                                        />
                                    </Col>
                                ) : null
                            )}
                        </Row>
                    ) : (
                        <Alert
                            icon={<ErrorOutlineOutlined />}
                            title={""}
                            color="orange"
                        >
                            {`There are no applicants yet`}
                        </Alert>
                    )}
                </>
            )}
        </div>
    );
};
