import ShareIcon from "@components/common/ShareIcon";
import { faLocationDot } from "@fortawesome/pro-regular-svg-icons";
import { faHourglassClock } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RingProgress, Text } from "@mantine/core";
import { Badge } from "@mantine/core";
import Image from "next/image";
import React from "react";

export const MyBookedTaskCard = () => {
    return (
        <div className="my-booked-task-card">
            <div className="title-price-wrapper d-flex justify-content-between gap-5">
                <div className="title-and-date">
                    <h3>Need a house Painter </h3>
                    <p>Posted on 25 May, 2022</p>
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
                    <div className="time d-flex align-items-center">
                        <FontAwesomeIcon
                            icon={faHourglassClock}
                            className="svg-icon"
                        />
                        N/A
                    </div>
                    <div className="name-and-image d-flex">
                        <Image
                            src="/groupB.png"
                            alt="circle image"
                            height={25}
                            width={25}
                            objectFit="cover"
                            className="profile-image"
                        />
                        <span>Dianne Russell</span>
                    </div>
                </div>
                <div className="ring-progress-bar">
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
            </div>
            <div className="d-flex justify-content-between align-items-center card-footer-section ">
                <Badge color="">In Progress</Badge>
                <div className="share-icon">
                    <ShareIcon url={""} quote={""} hashtag={""} showText />
                </div>
            </div>
        </div>
    );
};
