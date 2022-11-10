import ShareIcon from "@components/common/ShareIcon";
import BookingDetails from "@components/SearchTask/BookingDetails";
import { faLocationDot } from "@fortawesome/pro-regular-svg-icons";
import { faHourglassClock, faPeriod } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, RingProgress, Text } from "@mantine/core";
import { format } from "date-fns";
import Image from "next/image";
import React, { useState } from "react";
import type { MyBookingServiceProps } from "types/myBookingProps";

export const MyBookingTaskCard = ({
    item,
}: {
    item: MyBookingServiceProps["result"][0];
}) => {
    const [opened, setOpened] = useState(false);
    let color, progress, type;
    if (item?.status === "Open") {
        color = "blue";
        progress = 0;
    } else if (item?.status === "On Progress") {
        color = "yellow";
        progress = 40;
    } else if (item?.status === "Complete") {
        color = "green";
        progress = 60;
    } else if (item?.status === "Cancelled") {
        color = "red";
        progress = 0;
        type = "cancelled";
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
                        {item?.entity_service?.title?.length > 40
                            ? item?.entity_service?.title.substring(0, 40) +
                              "..."
                            : item?.entity_service?.title}
                    </h3>
                    <div className="image-and-date d-flex align-items-center">
                        {item?.entity_service?.created_by?.profile_image ? (
                            <Image
                                src={
                                    item?.entity_service?.created_by
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
                                src={"/placeholder/profilePlaceholder.png"}
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
                        </span>
                        <FontAwesomeIcon
                            icon={faPeriod}
                            className={"svg-icon"}
                        />
                        <span>{format(new Date(item?.created_at), "PP")}</span>
                    </div>
                </div>
                <div
                    className="price d-flex flex-column align-items-end"
                    onClick={() => setOpened(true)}
                >
                    <h2 className="text-nowrap">
                        {item?.entity_service?.currency?.symbol} {""}
                        {item?.budget_to}
                    </h2>
                    <p>{item?.entity_service?.budget_type}</p>
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
                        <span>{item?.location}</span>
                    </div>
                    <div className="location d-flex align-items-center">
                        <FontAwesomeIcon
                            icon={faHourglassClock}
                            className="svg-icon"
                        />
                        {item?.start_date &&
                            format(new Date(item?.start_date), "PP")}
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
                            {!type ? progress : 0}%
                        </Text>
                    }
                />
            </div>

            <div className="d-flex justify-content-between align-items-center card-footer-section ">
                <Badge color={color}>{item.status}</Badge>
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
