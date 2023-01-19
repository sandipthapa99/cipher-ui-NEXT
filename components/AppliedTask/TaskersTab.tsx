import { ApplicantCard } from "@components/SearchTask/ApplicantCard";
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
                                        <ApplicantCard card={item} />
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
