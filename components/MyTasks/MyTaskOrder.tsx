import { ReviewModal } from "@components/Review/ReviewModal";
import { Button } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useUser } from "hooks/auth/useUser";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import type { MyTaskOrderProps } from "types/myTasksProps";
import { axiosClient } from "utils/axiosClient";
import { toast } from "utils/toast";

export const MyTaskOrder = ({
    task_id,
    applied_id,
    assigner_id,
    created_at,
    currency,
    image,
    title,
    budget_from,
    budget_to,
    budget_type,
    completed_on,
    status,
    taskID,
}: MyTaskOrderProps) => {
    const [isAuthor, setIsAuthor] = useState(false);
    const { data: userData } = useUser();

    const router = useRouter();
    const [openReviewModal, setOpenReviewModal] = useState(false);
    console.log("task_id", task_id);

    useEffect(() => {
        if (userData?.id === assigner_id) {
            setIsAuthor(true);
        } else {
            setIsAuthor(false);
        }
    }, [assigner_id, userData]);

    const taskCompleteMutaion = useMutation<
        string,
        Error,
        { id: string; status: string }
    >(async ({ id, status }) =>
        axiosClient
            .post("/task/entity/service/task/status/", { task: id, status })
            .then((res) => res.data.message)
            .catch((error) => {
                throw new Error(error?.response?.data);
            })
    );

    const queryClient = useQueryClient();

    const taskCompleteHandler = (task_id: string) => {
        taskCompleteMutaion.mutate(
            { id: task_id, status: "Completed" },
            {
                onSuccess: async (message) => {
                    await queryClient.invalidateQueries(["assinged-task"]);
                    setOpenReviewModal(true);
                    toast.success(message);
                },
                onError: (error) => {
                    toast.error(error.message);
                },
            }
        );
    };

    const taskCloseHandler = (task_id: string) => {
        taskCompleteMutaion.mutate(
            { id: task_id, status: "Closed" },
            {
                onSuccess: async (message) => {
                    await queryClient.invalidateQueries(["Review-task"]);
                    setOpenReviewModal(true);
                    toast.success(message);
                },
                onError: (error) => {
                    toast.error(error.message);
                },
            }
        );
    };

    return (
        <>
            <div className="my-task-order text-black-50">
                <div className="d-flex justify-content-between align-items-center order-section">
                    <span className="order-id">
                        Order ID: #{task_id?.slice(0, 8)}
                    </span>
                    <span className="ordered-date">
                        {format(new Date(created_at), "EEEE, dd LLLL yyyy")}
                    </span>
                </div>

                <div className="order-detail-section">
                    <Row>
                        <Col lg={2} md={6} sm={6} xs={12}>
                            <Link href={`/task/${task_id}`}>
                                <a>
                                    <figure className="d-flex align-items-center justify-content-start h-100 w-100 order-detail-section__image">
                                        {!image && (
                                            <Image
                                                src={
                                                    "/placeholder/taskPlaceholder.png"
                                                }
                                                alt="order-detail-image"
                                                objectFit="contain"
                                                height={160}
                                                width={140}
                                            />
                                        )}
                                        {image && (
                                            <Image
                                                src={image}
                                                alt="order-detail-image"
                                                height={160}
                                                width={140}
                                            />
                                        )}
                                    </figure>
                                </a>
                            </Link>
                        </Col>
                        <Col md={6} sm={12}>
                            <Link href={`/task/${task_id}`}>
                                <a>
                                    <div className="title-and-description text-black-50">
                                        <h4>{title}</h4>
                                        {/* <p>By {assigner_name}</p> */}
                                        <div className="price-section">
                                            <span className="price">
                                                Price :{" "}
                                            </span>
                                            <span className="value">
                                                {currency + " "}{" "}
                                                {budget_from &&
                                                    budget_from + "-"}
                                                {budget_to}
                                                {budget_type === "Hourly"
                                                    ? "/hr"
                                                    : budget_type === "Monthly"
                                                    ? "/mn"
                                                    : budget_type === "Daily"
                                                    ? "/daily"
                                                    : "/project"}
                                            </span>
                                        </div>

                                        {/* <div className="price-section">
                            <span className="price">Duration : </span>
                            <span className="value">2 max hr/ week</span>
                        </div> */}

                                        <div className="price-section">
                                            <span className="price">
                                                Completed On :{" "}
                                            </span>
                                            <span className="value">
                                                {completed_on
                                                    ? completed_on
                                                    : "not completed yet"}
                                            </span>
                                        </div>
                                    </div>
                                </a>
                            </Link>
                        </Col>

                        <Col md={12} lg={4}>
                            <div className="badge-and-status w-100 d-flex">
                                <Link href={`/task/${task_id}`}>
                                    <a>
                                        <figure className="d-flex w-100 author-image mb-5">
                                            {isAuthor && (
                                                <Image
                                                    src="/userprofile/author.png"
                                                    alt="author-image"
                                                    height={50}
                                                    width={30}
                                                />
                                            )}
                                        </figure>
                                    </a>
                                </Link>
                                {router.query.activeTab === "3" && (
                                    <>
                                        {status === "Completed" ? (
                                            <Button
                                                variant="light"
                                                color="orange"
                                                className="ms-auto mb-3"
                                                disabled
                                            >
                                                Waiting for approval
                                            </Button>
                                        ) : status === "Open" ? (
                                            <Button
                                                variant="light"
                                                color="orange"
                                                className="ms-auto mb-3"
                                                onClick={() => {
                                                    taskCompleteHandler(
                                                        applied_id
                                                            ? applied_id
                                                            : ""
                                                    );
                                                }}
                                                loading={
                                                    taskCompleteMutaion.isLoading
                                                }
                                            >
                                                Mark as Completed
                                            </Button>
                                        ) : (
                                            ""
                                        )}
                                    </>
                                )}
                                {router.query.activeTab === "4" && (
                                    <>
                                        {status === "Completed" && (
                                            <Button
                                                variant="light"
                                                color="orange"
                                                className="ms-auto mb-3"
                                                onClick={() => {
                                                    taskCloseHandler(
                                                        applied_id
                                                            ? applied_id
                                                            : ""
                                                    );
                                                }}
                                                loading={
                                                    taskCompleteMutaion.isLoading
                                                }
                                            >
                                                Close Task
                                            </Button>
                                        )}
                                    </>
                                )}
                                <Link href={`/task/${task_id}`}>
                                    <a>
                                        <div className="d-flex justify-content-end align-items-center status-section">
                                            <span className="status text-black-50">
                                                Status
                                            </span>
                                            <span
                                                className={`status-value__${status}`}
                                            >
                                                {status}
                                            </span>
                                        </div>
                                    </a>
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            <ReviewModal
                open={(status === "Completed" || "closed") && openReviewModal}
                handleClose={() => setOpenReviewModal(false)}
                taskId={taskID}
            />
        </>
    );
};
