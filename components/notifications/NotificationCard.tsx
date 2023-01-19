import BigButton from "@components/common/Button";
import { BusinessCenterOutlined } from "@mui/icons-material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import type { NotificationResponseProps } from "types/notificationResponseProps";
import { axiosClient } from "utils/axiosClient";
import { toast } from "utils/toast";

export enum TITLE_TYPES {
    booking = "booking",
    approval = "approval",
    approved = "Approved",
    status_completed = "status completed",
    status_closed = "status closed",
    created = "created",
    rejected = "Rejected",
    followed = "followed",
}

export enum APPROVAL_STATUS {
    pending = "pending",
    approved = "approved",
    rejected = "rejected",
    closed = "closed",
    cancelled = "cancelled",
}

export const NotificationCard = ({
    notification,
}: {
    notification: NotificationResponseProps["result"][0];
}) => {
    console.log(
        "🚀 ~ file: NotificationCard.tsx:36 ~ notification",
        notification
    );
    const { read_date, created_date, content_object, created_for, title, id } =
        notification ?? {};

    const sendBookApproval = useMutation(
        (data: { booking: number | undefined }) =>
            axiosClient.post("/task/entity/service-booking/approval/", data)
    );
    const sendBookReject = useMutation(
        (data: { booking: number | undefined }) =>
            axiosClient.post("/task/entity/service-booking/reject/", data)
    );

    const router = useRouter();

    const renderBodyWRTTitle = () => {
        switch (title) {
            case TITLE_TYPES.approval:
                return {
                    body: (
                        <>
                            <span className="span-name">
                                {created_for?.full_name}{" "}
                            </span>{" "}
                            is interested for{" "}
                            <span className="span-name">
                                {content_object?.entity_service?.title}
                            </span>
                        </>
                    ),
                    image: (
                        <figure className="d-flex flex-column justify-content-center notification-image bg-transparent">
                            <Image
                                alt="testimage"
                                src={
                                    created_for?.profile_image ??
                                    "/userprofile/unknownPerson.jpg"
                                }
                                height={50}
                                width={50}
                            />
                        </figure>
                    ),
                };
            case TITLE_TYPES.approved:
                return {
                    body: (
                        <>
                            <span className="span-name">Congratulations! </span>{" "}
                            You have been hired for{" "}
                            <span className="span-name">
                                {content_object?.entity_service?.title}
                            </span>
                        </>
                    ),
                    image: (
                        <figure className="d-flex flex-column justify-content-center notification-image bg-transparent">
                            <Image
                                alt="testimage"
                                src={
                                    created_for?.profile_image ??
                                    "/userprofile/unknownPerson.jpg"
                                }
                                height={50}
                                width={50}
                            />
                        </figure>
                    ),
                };
            case TITLE_TYPES.booking:
                return {
                    body: (
                        <>
                            <span className="span-name">Outstanding!</span> You
                            have booked{" "}
                            <span className="span-name">
                                {content_object?.entity_service?.title}
                            </span>
                        </>
                    ),
                    image: (
                        <figure className="d-flex justify-content-center notification-image rounded-circle">
                            <BusinessCenterOutlined
                                style={{ color: "white" }}
                            />
                        </figure>
                    ),
                };
            case TITLE_TYPES.created:
                return {
                    body: (
                        <>
                            Created{" "}
                            <span className="span-name">
                                {content_object?.title}
                            </span>
                        </>
                    ),
                    image: (
                        <figure className="d-flex flex-column justify-content-center notification-image rounded-circle">
                            <BusinessCenterOutlined
                                style={{ color: "white" }}
                            />
                        </figure>
                    ),
                };
            case TITLE_TYPES.status_closed:
                return {
                    body: (
                        <>
                            <span className="span-name">
                                {created_for?.full_name}{" "}
                            </span>{" "}
                            has closed{" "}
                            <span className="span-name">
                                {content_object?.entity_service?.title}
                            </span>
                        </>
                    ),
                    image: (
                        <figure className="d-flex flex-column justify-content-center notification-image bg-transparent">
                            <Image
                                alt="testimage"
                                src={
                                    created_for?.profile_image ??
                                    "/userprofile/unknownPerson.jpg"
                                }
                                height={50}
                                width={50}
                            />
                        </figure>
                    ),
                };
            case TITLE_TYPES.status_completed:
                return {
                    body: (
                        <>
                            <span className="span-name">
                                {created_for?.full_name}{" "}
                            </span>{" "}
                            has completed{" "}
                            <span className="span-name">
                                {content_object?.entity_service?.title}
                            </span>
                        </>
                    ),
                    image: (
                        <figure className="d-flex flex-column justify-content-center notification-image bg-transparent">
                            <Image
                                alt="testimage"
                                src={
                                    created_for?.profile_image ??
                                    "/userprofile/unknownPerson.jpg"
                                }
                                height={50}
                                width={50}
                            />
                        </figure>
                    ),
                };
            case TITLE_TYPES.rejected:
                return {
                    body: (
                        <>
                            <span className="span-name">
                                {created_for?.full_name}{" "}
                            </span>{" "}
                            has rejected your request for{" "}
                            <span className="span-name">
                                {content_object?.entity_service?.title}
                            </span>
                        </>
                    ),
                    image: (
                        <figure className="d-flex flex-column justify-content-center notification-image bg-transparent">
                            <Image
                                alt="testimage"
                                src={
                                    created_for?.profile_image ??
                                    "/userprofile/unknownPerson.jpg"
                                }
                                height={50}
                                width={50}
                            />
                        </figure>
                    ),
                };
            case TITLE_TYPES.followed:
                return {
                    body: (
                        <>
                            <span className="span-name">
                                {created_for?.full_name}{" "}
                            </span>{" "}
                            has followed <span className="span-name">You</span>
                        </>
                    ),
                    image: (
                        <figure className="d-flex flex-column justify-content-center notification-image bg-transparent">
                            <Image
                                alt="testimage"
                                src={
                                    created_for?.profile_image ??
                                    "/userprofile/unknownPerson.jpg"
                                }
                                height={50}
                                width={50}
                            />
                        </figure>
                    ),
                };
            default:
                return null;
        }
    };

    const renderDifferentButton = () => {
        switch (content_object?.status) {
            case APPROVAL_STATUS?.pending:
                return (
                    <>
                        <div className="d-flex align-items-center gap-3 approve-reject-buttons">
                            <BigButton
                                btnTitle={"Decline"}
                                backgroundColor={"#fff"}
                                handleClick={() => {
                                    sendBookReject.mutate(
                                        {
                                            booking: parseInt(
                                                content_object?.id
                                            ),
                                        },
                                        {
                                            onSuccess: () => {
                                                toast.success(
                                                    "Booking Rejected"
                                                );
                                                queryClient.invalidateQueries([
                                                    "notifications",
                                                ]);
                                                // router.push("/home");
                                            },
                                            onError: (error: any) => {
                                                toast.error(
                                                    error.response.data.booking
                                                        .message
                                                );
                                            },
                                        }
                                    );
                                }}
                                textColor={"#211D4F"}
                                border="1px solid #211D4F"
                            />
                            <BigButton
                                btnTitle={"Approve"}
                                backgroundColor={"#211D4F"}
                                loading={sendBookApproval.isLoading}
                                handleClick={() => {
                                    sendBookApproval.mutate(
                                        {
                                            booking: parseInt(
                                                content_object?.id
                                            ),
                                        },
                                        {
                                            onSuccess: () => {
                                                toast.success(
                                                    "Booking Approved"
                                                );
                                                queryClient.invalidateQueries([
                                                    "get-my-bookings",
                                                ]);
                                                queryClient.invalidateQueries([
                                                    "notifications",
                                                ]);
                                            },
                                            onError: (error: any) => {
                                                toast.error(
                                                    error.response.data.booking
                                                        .message
                                                );
                                            },
                                        }
                                    );
                                }}
                                textColor={"#fff"}
                            />
                        </div>
                    </>
                );
            case APPROVAL_STATUS?.approved:
                return (
                    <div
                        className="d-flex align-items-center gap-3 approve-reject-buttons"
                        onClick={() =>
                            queryClient.invalidateQueries(["notifications"])
                        }
                    >
                        <BigButton
                            btnTitle={"Approved"}
                            backgroundColor={"#32cd32"}
                            className="border-0"
                            loading={sendBookApproval.isLoading}
                            textColor={"#fff"}
                        />
                    </div>
                );
            case APPROVAL_STATUS?.cancelled:
                return (
                    <div className="d-flex align-items-center gap-3 approve-reject-buttons">
                        <BigButton
                            btnTitle={"Cancelled"}
                            backgroundColor={"#32cd32"}
                            className="border-0"
                            loading={sendBookApproval.isLoading}
                            textColor={"#fff"}
                        />
                    </div>
                );
            case APPROVAL_STATUS?.closed:
                return (
                    <div className="d-flex align-items-center gap-3 approve-reject-buttons">
                        <BigButton
                            btnTitle={"Closed"}
                            backgroundColor={"#FE5050"}
                            className="border-0"
                            loading={sendBookApproval.isLoading}
                            textColor={"#fff"}
                        />
                    </div>
                );
            case APPROVAL_STATUS?.rejected:
                return (
                    <div className="d-flex align-items-center gap-3 approve-reject-buttons">
                        <BigButton
                            btnTitle={"Rejected"}
                            backgroundColor={"#FE5050"}
                            className="border-0"
                            loading={sendBookApproval.isLoading}
                            textColor={"#fff"}
                        />
                    </div>
                );
        }
    };

    const queryClient = useQueryClient();

    const readSingleNotification = async (id: number) => {
        await axiosClient.post(`/notification/read/?pk=${id}`);
        queryClient.invalidateQueries(["notifications"]);
    };

    const handleRedirect = (
        type: boolean,
        slug?: string,
        taskID?: string,
        content_object_id?: string,
        content_object_slug?: string,
        content_object_type?: boolean
    ) => {
        if (title === TITLE_TYPES.followed) {
            router?.push(`/tasker/${content_object_id}`);
        } else if (title === TITLE_TYPES.created) {
            if (content_object_type) {
                router.push(`/task/${content_object_id}`);
            } else {
                router.push(`/service/${content_object_slug}`);
            }
        } else if (type) {
            router.push(`/task/${taskID}`);
        } else {
            router.push(`/service/${slug}`);
        }
    };

    return (
        <div
            className="d-flex align-items-center justify-content-between accepted-notification"
            style={{
                backgroundColor: read_date === null ? "#ecf7ff" : "#f8f9fa",
            }}
            onClick={() => {
                if (!read_date) {
                    console.log("asdasdsdasd");
                    readSingleNotification(id);
                }
                handleRedirect(
                    content_object?.entity_service?.is_requested,
                    content_object?.entity_service?.slug,
                    content_object?.entity_service?.id,
                    content_object?.id,
                    content_object?.slug,
                    content_object?.is_requested
                );
            }}
        >
            <div className="d-flex justify-content-between align-items-center w-100 notification-wrapper">
                {renderBodyWRTTitle()?.image}
                <div className="ps-3 w-100">
                    <div className="description-section">
                        <p>{renderBodyWRTTitle()?.body}</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="date mb-0">
                            {formatDistanceToNow(new Date(created_date), {
                                addSuffix: true,
                            })}
                        </p>
                        {title === TITLE_TYPES.approval &&
                            renderDifferentButton()}
                    </div>
                </div>
            </div>
        </div>
    );
};
