import ShareIcon from "@components/common/ShareIcon";
import BookingDetails from "@components/SearchTask/BookingDetails";
import { faLocationDot } from "@fortawesome/pro-regular-svg-icons";
import { faHourglassClock, faPeriod } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, RingProgress, Text } from "@mantine/core";
import { format } from "date-fns";
import Image from "next/image";
import React, { useState } from "react";
import type { ApprovedTaskProps } from "types/approvedTaskProps";
import type { MyBookingServiceProps } from "types/myBookingProps";

export const MyBookingTaskCard = ({
    item,
    Approvedtask,
}: {
    item?: MyBookingServiceProps["result"][0];
    Approvedtask?: ApprovedTaskProps["result"][0];
}) => {
    const [opened, setOpened] = useState(false);
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
    return (
        <div className="my-booking-task-card">
            <div
                className="title-price-wrapper d-flex justify-content-between gap-5"
                role={"button"}
                onClick={() => setOpened(true)}
            >
                <div className="title-and-date">
                    <h3>
                        {item?.entity_service?.title &&
                        item?.entity_service?.title?.length > 40
                            ? item?.entity_service?.title.substring(0, 40) +
                              "..."
                            : item?.entity_service?.title}
                        {Approvedtask?.title && Approvedtask?.title?.length > 40
                            ? Approvedtask?.title.substring(0, 40) + "..."
                            : Approvedtask?.title}
                    </h3>
                    <div className="image-and-date d-flex align-items-center">
                        {item?.entity_service?.created_by?.profile_image && (
                            <Image
                                src={
                                    item?.entity_service?.created_by
                                        ?.profile_image
                                        ? item?.entity_service?.created_by
                                              ?.profile_image
                                        : "/placeholder/profilePlaceholder.png"
                                }
                                alt="circle image"
                                height={25}
                                width={25}
                                objectFit="cover"
                                className="profile-image"
                            />
                        )}
                        {Approvedtask?.assignee?.profile_image && (
                            <Image
                                src={
                                    Approvedtask?.assigner?.profile_image
                                        ? Approvedtask?.assigner?.profile_image
                                        : "/placeholder/profilePlaceholder.png"
                                }
                                alt="circle image"
                                height={25}
                                width={25}
                                objectFit="cover"
                                className="profile-image"
                            />
                        )}

                        <span>
                            {item?.entity_service?.created_by?.first_name}{" "}
                            {item?.entity_service?.created_by?.middle_name}{" "}
                            {item?.entity_service?.created_by?.last_name}
                            {Approvedtask?.assigner?.first_name}{" "}
                            {Approvedtask?.assigner?.middle_name}
                            {Approvedtask?.assigner?.last_name}
                        </span>
                        <FontAwesomeIcon
                            icon={faPeriod}
                            className={"svg-icon"}
                        />
                        <span>
                            {item?.created_at &&
                                format(new Date(item?.created_at), "PP")}
                            {Approvedtask?.created_at &&
                                format(
                                    new Date(Approvedtask?.created_at),
                                    "PP"
                                )}
                        </span>
                    </div>
                </div>
                <div
                    className="price d-flex flex-column align-items-end"
                    onClick={() => setOpened(true)}
                >
                    <h2 className="text-nowrap">
                        {item?.entity_service?.currency?.symbol} {""}
                        {item?.budget_to}
                        {Approvedtask?.currency?.symbol} {""}
                        {Approvedtask?.charge}
                    </h2>
                    <p>
                        {item?.entity_service?.budget_type}{" "}
                        {Approvedtask?.entity_service?.budget_type}
                    </p>
                </div>
            </div>

            <div
                className="center-section d-flex align-items-center justify-content-between"
                role={"button"}
                onClick={() => setOpened(true)}
            >
                <div className="name-and-location">
                    <div className="location d-flex align-items-center">
                        <FontAwesomeIcon
                            icon={faLocationDot}
                            className="svg-icon"
                        />
                        <span>
                            {item?.location} {Approvedtask?.location}
                        </span>
                    </div>
                    <div className="location d-flex align-items-center">
                        <FontAwesomeIcon
                            icon={faHourglassClock}
                            className="svg-icon"
                        />
                        {item?.start_date &&
                            format(new Date(item?.start_date), "PP")}
                        {Approvedtask?.start_date &&
                            format(new Date(Approvedtask?.start_date), "PP")}
                    </div>
                    {/* <div className="location">
                        <FontAwesomeIcon
                            icon={faUserGroup}
                            className="svg-icon"
                        />
                        <span>100 Applied</span>
                    </div> */}
                </div>
                <RingProgress
                    sections={[{ value: progress, color: color }]}
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

            <div className="d-flex justify-content-between align-items-center card-footer-section ">
                <Badge color={color}>
                    {item?.status} {Approvedtask?.status}
                </Badge>
                <div className="icons-section d-flex">
                    <div className="share-icon">
                        <ShareIcon url={""} quote={""} hashtag={""} showText />
                    </div>
                </div>
            </div>
            <BookingDetails
                show={opened}
                setShow={setOpened}
                bookingId={String(item?.id) ?? ""}
            />
        </div>
    );
};
