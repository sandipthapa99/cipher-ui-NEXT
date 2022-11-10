import ShareIcon from "@components/common/ShareIcon";
import { faLocationDot } from "@fortawesome/pro-regular-svg-icons";
import { faHourglassClock } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RingProgress, Text } from "@mantine/core";
import { Badge } from "@mantine/core";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";
import type { MyBookingServiceProps } from "types/myBookingProps";

export const MyBookedTaskCard = ({
    item,
}: {
    item: MyBookingServiceProps["result"][0];
}) => {
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
        <div className="my-booked-task-card">
            <div className="title-price-wrapper d-flex justify-content-between gap-5">
                <div className="title-and-date">
                    <h3>{item?.entity_service?.title}</h3>
                    <p>
                        Posted on{" "}
                        {format(
                            new Date(item?.entity_service?.created_at),
                            "PPP"
                        )}
                    </p>
                </div>
                <div className="price d-flex flex-column align-items-end">
                    <h2 className="text-nowrap">
                        {item?.entity_service?.currency?.symbol} {""}
                        {item?.budget_to}
                    </h2>
                    <p>{item?.entity_service?.budget_type}</p>
                </div>
            </div>
            <div className="center-section d-flex justify-content-between">
                <div className="name-and-location">
                    <div className="d-flex align-items-center location">
                        <FontAwesomeIcon
                            icon={faLocationDot}
                            className="svg-icon me-4"
                        />
                        <span>{item?.location}</span>
                    </div>
                    <div className="time d-flex align-items-center">
                        <FontAwesomeIcon
                            icon={faHourglassClock}
                            className="svg-icon ms-1 me-4"
                        />
                        {item?.start_date &&
                            format(new Date(item?.start_date), "PPP")}
                    </div>
                    <div className="name-and-image d-flex">
                        {item?.created_by?.profile_image ? (
                            <Image
                                src={item?.created_by?.profile_image}
                                alt="circle image"
                                height={25}
                                width={25}
                                objectFit="cover"
                                className="profile-image"
                            />
                        ) : (
                            <Image
                                src={"/placeholder/taskPlaceholder.png"}
                                alt="circle image"
                                height={25}
                                width={25}
                                objectFit="cover"
                                className="profile-image"
                            />
                        )}

                        <span>
                            {item?.created_by?.user?.first_name}{" "}
                            {item?.created_by?.user?.middle_name}
                            {item?.created_by?.user?.last_name}
                        </span>
                    </div>
                </div>
                <div className="ring-progress-bar">
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
            </div>
            <div className="d-flex justify-content-between align-items-center card-footer-section ">
                <Badge color={color}>{item?.status}</Badge>
                <div className="share-icon">
                    <ShareIcon url={""} quote={""} hashtag={""} showText />
                </div>
            </div>
        </div>
    );
};
