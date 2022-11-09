import SaveIcon from "@components/common/SaveIcon";
import ShareIcon from "@components/common/ShareIcon";
import {
    faLocationArrow,
    faLocationDot,
    faUserGroup,
} from "@fortawesome/pro-regular-svg-icons";
import { faHourglassClock, faPeriod } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge } from "@mantine/core";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";
import type { MyBookingServiceProps } from "types/myBookingProps";

export const MyBookingTaskCard = ({
    item,
}: {
    item: MyBookingServiceProps["result"][0];
}) => {
    return (
        <div className="my-booking-task-card">
            <div className="title-price-wrapper d-flex justify-content-between gap-5">
                <div className="title-and-date">
                    <h3>{item?.entity_service?.title}</h3>
                    <div className="image-and-date d-flex align-items-center">
                        <Image
                            src="/groupB.png"
                            alt="circle image"
                            height={25}
                            width={25}
                            objectFit="cover"
                            className="profile-image"
                        />
                        <span>
                            {item?.created_by?.user?.first_name}{" "}
                            {item?.created_by?.user?.middle_name}{" "}
                            {item?.created_by?.user?.last_name}
                        </span>
                        <FontAwesomeIcon
                            icon={faPeriod}
                            className={"svg-icon"}
                        />
                        <span>{format(new Date(item?.created_at), "PP")}</span>
                    </div>
                </div>
                <div className="price d-flex flex-column align-items-end">
                    <h2 className="text-nowrap">
                        {item?.entity_service?.currency?.symbol} {""}
                        {item?.budget_to}
                    </h2>
                    <p>{item?.entity_service?.budget_type}</p>
                </div>
            </div>

            <div className="name-and-location">
                <div className="location d-flex align-items-center">
                    <FontAwesomeIcon
                        icon={faLocationDot}
                        className="location-icon"
                    />
                    <span>{item?.location}</span>
                </div>
                {/* <div className="location">
                    <FontAwesomeIcon
                        icon={faLocationArrow}
                        className="location-icon"
                    />
                    <span>2 Km away</span>
                </div> */}
                <div className="location">
                    <FontAwesomeIcon
                        icon={faHourglassClock}
                        className="location-icon"
                    />
                    {item?.start_date &&
                        format(new Date(item?.start_date), "PPP")}
                </div>
                {/* <div className="location">
                    <FontAwesomeIcon
                        icon={faUserGroup}
                        className="location-icon"
                    />
                    <span>100 Applied</span>
                </div> */}
            </div>

            <div className="d-flex justify-content-between align-items-center card-footer-section ">
                <Badge color="green">{item.status}</Badge>
                <div className="icons-section d-flex">
                    <div className="share-icon">
                        <ShareIcon url={""} quote={""} hashtag={""} showText />
                    </div>
                    <SaveIcon object_id={""} model={""} showText />
                </div>
            </div>
        </div>
    );
};
