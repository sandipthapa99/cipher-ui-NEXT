import SaveIcon from "@components/common/SaveIcon";
import ShareIcon from "@components/common/ShareIcon";
import {
    faLocationArrow,
    faLocationDot,
    faUserGroup,
} from "@fortawesome/pro-regular-svg-icons";
import { faHourglassClock, faPeriod } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, RingProgress, Text } from "@mantine/core";
import Image from "next/image";
import React from "react";

export const MyBookingTaskCard = () => {
    return (
        <div className="my-booking-task-card">
            <div className="title-price-wrapper d-flex justify-content-between gap-5">
                <div className="title-and-date">
                    <h3>Need a house Painter</h3>
                    <div className="image-and-date d-flex align-items-center">
                        <Image
                            src="/groupB.png"
                            alt="circle image"
                            height={25}
                            width={25}
                            objectFit="cover"
                            className="profile-image"
                        />
                        <span>Jane Cooper</span>
                        <FontAwesomeIcon icon={faPeriod} />
                        <span>25 May, 2022</span>
                    </div>
                </div>
                <div className="price d-flex flex-column align-items-end">
                    <h2>Rs 200</h2>
                    <p>per hour</p>
                </div>
            </div>

            <div className="center-section d-flex justify-content-between">
                <div className="name-and-location">
                    <div className="location d-flex align-items-center">
                        <FontAwesomeIcon
                            icon={faLocationDot}
                            className="svg-icon"
                        />
                        <span>Anamnagar, Baneshor, KTM, Nepal</span>
                    </div>
                    <div className="location d-flex align-items-center">
                        <FontAwesomeIcon
                            icon={faLocationArrow}
                            className="svg-icon"
                        />
                        <span>2 Km away</span>
                    </div>
                    <div className="location d-flex align-items-center">
                        <FontAwesomeIcon
                            icon={faHourglassClock}
                            className="svg-icon"
                        />
                        30 May, 2022
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
                    sections={[{ value: 40, color: "blue" }]}
                    label={
                        <Text
                            color="blue"
                            weight={600}
                            align="center"
                            size="xl"
                        >
                            40%
                        </Text>
                    }
                />
            </div>

            <div className="d-flex justify-content-between align-items-center card-footer-section ">
                <Badge color="green">Open</Badge>

                <div className="share-icon">
                    <ShareIcon url={""} quote={""} hashtag={""} showText />
                </div>
            </div>
        </div>
    );
};
