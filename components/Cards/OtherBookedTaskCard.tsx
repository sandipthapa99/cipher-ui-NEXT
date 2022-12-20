import ShareIcon from "@components/common/ShareIcon";
import { ReviewModal } from "@components/Review/ReviewModal";
import { ApprovedTaskDetail } from "@components/SearchTask/ApprovedTaskDetail";
import BookingDetails from "@components/SearchTask/BookingDetails";
import { faLocationDot } from "@fortawesome/pro-regular-svg-icons";
import { faHourglassClock } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, RingProgress, Text } from "@mantine/core";
import { Badge } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import type { ApprovedTaskProps } from "types/approvedTaskProps";
import type { MyBookingServiceProps } from "types/myBookingProps";
import type { MyOrderProps } from "types/myOrderProps";
import type { MyTaskProps } from "types/myTasksProps";
import { axiosClient } from "utils/axiosClient";
import { toast } from "utils/toast";

export const OtherBookedTaskCard = ({
    item,
    myTask,
    Approvedtask,
    linkTo,
    order,
}: {
    item?: MyBookingServiceProps["result"][0];
    myTask?: MyTaskProps;
    Approvedtask?: ApprovedTaskProps["result"][0];
    linkTo: string;
    order?: MyOrderProps["result"][0]["order_item"]["0"];
}) => {
    const [opened, setOpened] = useState(false);
    const [openReviewModal, setOpenReviewModal] = useState(false);

    const taskCloseMutaion = useMutation<
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

    const taskCloseHandler = (task_id: string) => {
        taskCloseMutaion.mutate(
            { id: task_id, status: "Closed" },
            {
                onSuccess: async (message) => {
                    await queryClient.invalidateQueries(["approved-task"]);
                    setOpenReviewModal(true);
                    toast.success(message);
                },
                onError: (error) => {
                    toast.error(error.message);
                },
            }
        );
    };

    let status;
    if (item) {
        status = item?.status;
    }
    if (Approvedtask) {
        status = Approvedtask?.status;
    }

    let color, progress;
    if (status === "Open") {
        color = "blue";
        progress = 0;
    } else if (status === "On Progress") {
        color = "yellow";
        progress = 40;
    } else if (status === "Completed") {
        color = "cyan";
        progress = 90;
    } else if (status === "Cancelled") {
        color = "red";
        progress = 50;
    } else if (status === "Closed") {
        color = "green";
        progress = 100;
    } else {
        color = "grey";
        progress = 0;
    }

    const router = useRouter();
    return (
        <div className="my-booked-task-card">
            <Link href={linkTo}>
                <a>
                    <div
                        className="title-price-wrapper d-flex justify-content-between gap-5"
                        role={"button"}
                        onClick={() => setOpened(true)}
                    >
                        <div className="title-and-date">
                            <h3>
                                {item?.entity_service?.title &&
                                item?.entity_service?.title?.length > 40
                                    ? item?.entity_service?.title.substring(
                                          0,
                                          40
                                      ) + "..."
                                    : item?.entity_service?.title}

                                {myTask?.title && myTask?.title?.length > 40
                                    ? myTask?.title.substring(0, 40) + "..."
                                    : myTask?.title}

                                {Approvedtask?.title &&
                                Approvedtask?.title?.length > 40
                                    ? Approvedtask?.title.substring(0, 40) +
                                      "..."
                                    : Approvedtask?.title}
                                {order?.task?.title}
                            </h3>
                        </div>
                        <div className="price d-flex flex-column align-items-end">
                            <h2 className="text-nowrap">
                                {item?.entity_service?.currency?.symbol} {""}
                                {item?.budget_to}
                                {myTask?.currency?.symbol} {""}
                                {myTask?.budget_from
                                    ? `${myTask?.budget_from} -`
                                    : ""}{" "}
                                {myTask?.budget_to}
                                {Approvedtask?.currency?.symbol} {""}
                                {Approvedtask?.charge}
                            </h2>
                            <p>
                                {item?.entity_service?.budget_type}{" "}
                                {myTask?.budget_type}
                                {Approvedtask?.entity_service?.budget_type}
                            </p>
                        </div>
                    </div>
                    <p className="posted-date" onClick={() => setOpened(true)}>
                        Posted on{" "}
                        {item?.entity_service?.created_at &&
                            format(
                                new Date(item?.entity_service?.created_at),
                                "PPP"
                            )}
                        {myTask?.created_at &&
                            format(new Date(myTask?.created_at), "PPP")}
                        {Approvedtask?.created_at &&
                            format(new Date(Approvedtask?.created_at), "PPP")}
                    </p>
                    <div
                        className="center-section d-flex flex-column flex-sm-row justify-content-between"
                        role={"button"}
                        onClick={() => setOpened(true)}
                    >
                        <div className="name-and-location">
                            <div className="d-flex align-items-center location">
                                <FontAwesomeIcon
                                    icon={faLocationDot}
                                    className="svg-icon me-4"
                                />
                                <span>
                                    {item?.location}{" "}
                                    {myTask?.is_requested
                                        ? myTask?.location
                                        : myTask?.city?.name}{" "}
                                    {Approvedtask?.location}
                                </span>
                            </div>
                            <div className="time d-flex align-items-center">
                                <FontAwesomeIcon
                                    icon={faHourglassClock}
                                    className="svg-icon ms-1 me-4"
                                />

                                {item?.start_date &&
                                    format(new Date(item?.start_date), "PPP")}
                                {myTask?.is_requested
                                    ? myTask?.start_date
                                        ? format(
                                              new Date(myTask?.start_date),
                                              "PPP"
                                          )
                                        : ""
                                    : "Flexible"}
                                {Approvedtask?.start_date
                                    ? format(
                                          new Date(Approvedtask?.start_date),
                                          "PPP"
                                      )
                                    : ""}
                            </div>
                            {!myTask && !Approvedtask && (
                                <div className="name-and-image d-flex">
                                    {item?.created_by?.profile_image ? (
                                        <Image
                                            src={
                                                item?.created_by?.profile_image
                                            }
                                            alt="circle image"
                                            height={25}
                                            width={25}
                                            objectFit="cover"
                                            className="profile-image"
                                        />
                                    ) : (
                                        <Image
                                            src={
                                                "/placeholder/profilePlaceholder.png"
                                            }
                                            alt="circle image"
                                            height={25}
                                            width={25}
                                            objectFit="cover"
                                            className="profile-image"
                                        />
                                    )}

                                    <span>
                                        {item?.created_by?.user?.first_name}{" "}
                                        {item?.created_by?.user?.middle_name ??
                                            ""}
                                        {item?.created_by?.user?.last_name}
                                    </span>
                                </div>
                            )}
                            {Approvedtask && (
                                <div className="name-and-image d-flex">
                                    {Approvedtask?.assignee?.profile_image ? (
                                        <Image
                                            src={
                                                Approvedtask?.assignee
                                                    ?.profile_image
                                            }
                                            alt="circle image"
                                            height={25}
                                            width={25}
                                            objectFit="cover"
                                            className="profile-image"
                                        />
                                    ) : (
                                        <Image
                                            src={
                                                "/placeholder/profilePlaceholder.png"
                                            }
                                            alt="circle image"
                                            height={25}
                                            width={25}
                                            objectFit="cover"
                                            className="profile-image"
                                        />
                                    )}

                                    <span>
                                        {Approvedtask?.assignee?.first_name}{" "}
                                        {Approvedtask?.assignee?.middle_name ??
                                            ""}
                                        {Approvedtask?.assignee?.last_name}
                                    </span>
                                </div>
                            )}
                        </div>
                        {Approvedtask && (
                            <div className="ring-progress-bar">
                                <RingProgress
                                    sections={[
                                        { value: progress, color: color },
                                    ]}
                                    thickness={9}
                                    roundCaps
                                    label={
                                        <Text
                                            color={color}
                                            weight={600}
                                            align="center"
                                            size="xl"
                                        >
                                            {progress}%
                                        </Text>
                                    }
                                />
                            </div>
                        )}
                    </div>
                </a>
            </Link>
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center card-footer-section ">
                {!myTask && !Approvedtask && (
                    <Badge color={color}>{item?.status}</Badge>
                )}
                {Approvedtask && (
                    <Badge color={color}>{Approvedtask?.status}</Badge>
                )}
                <span className="d-flex gap-3">
                    <div className="share-icon">
                        <ShareIcon url={""} quote={""} hashtag={""} showText />
                    </div>
                    {Approvedtask && Approvedtask?.is_paid === false && (
                        <Button
                            variant="light"
                            onClick={() =>
                                router.push({
                                    pathname: "/home",
                                    query: `activeTab=3&name=${Approvedtask?.title}`,
                                })
                            }
                        >
                            Pay Now
                        </Button>
                    )}
                    {Approvedtask &&
                        Approvedtask?.status === "Completed" &&
                        Approvedtask?.is_paid && (
                            <Button
                                variant="light"
                                color="green"
                                onClick={() => {
                                    taskCloseHandler(
                                        Approvedtask?.id ? Approvedtask?.id : ""
                                    );
                                }}
                            >
                                Close
                            </Button>
                        )}
                </span>
            </div>
            {router.query.activeTab === "1" && (
                <BookingDetails
                    show={opened}
                    setShow={setOpened}
                    bookingId={String(item?.id) ?? ""}
                />
            )}
            {router.query.activeTab === "2" && (
                <ApprovedTaskDetail
                    show={opened}
                    setShow={setOpened}
                    approvedId={String(Approvedtask?.id) ?? ""}
                />
            )}
            {Approvedtask?.id && (
                <ReviewModal
                    open={
                        (status === "Completed" || "closed") && openReviewModal
                    }
                    handleClose={() => setOpenReviewModal(false)}
                    taskId={Approvedtask?.id}
                />
            )}
        </div>
    );
};
