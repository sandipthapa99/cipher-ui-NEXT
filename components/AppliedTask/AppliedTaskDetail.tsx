import { Collaboration } from "@components/Collaboration/Collaboration";
import ServiceHighlights from "@components/common/ServiceHighlights";
import SimpleProfileCard from "@components/common/SimpleProfileCard";
import { Tab } from "@components/common/Tab";
import {
    faCalendar,
    faChevronLeft,
    faClockEight,
    faEllipsisVertical,
    faEye,
    faHeart,
    faLocationDot,
    faShare,
    faUserGroup,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { serviceHighlights } from "staticData/serviceHighlights";
import { serviceProvider } from "staticData/serviceProvider";
import { TaskersTab } from "./TaskersTab";

const AppliedTaskDetail: NextPage = () => {
    const [activeTabIdx, setActiveTabIdx] = useState(0);
    return (
        <div className="task-detail mb-5 p-5">
            <Link href="/task">
                <a>
                    <FontAwesomeIcon
                        icon={faChevronLeft}
                        className="svg-icon"
                    />
                    Go Back
                </a>
            </Link>

            <h3>Need a garden cleaner</h3>
            <Row>
                <div className="d-flex flex-sm-row flex-column justify-content-between mb-5">
                    <span className="pb-3 pb-sm-0 provider-name">
                        25 May, 2022 - 02:30 PM
                    </span>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex flex-col align-items-center">
                            <FontAwesomeIcon
                                icon={faHeart}
                                className="svg-icon heart-icon"
                            />
                            <span className="name">Save</span>
                        </div>
                        <div className="d-flex flex-col align-items-center mx-5">
                            <FontAwesomeIcon
                                icon={faShare}
                                className="svg-icon share-icon"
                            />
                            <span className="name">Share</span>
                        </div>
                        <FontAwesomeIcon
                            icon={faEllipsisVertical}
                            className="svg-icon option"
                        />
                    </div>
                </div>
            </Row>
            <Row>
                <Col md={12} lg={7}>
                    <figure className="thumbnail-img">
                        <Image
                            src="/service-details/Garden.svg"
                            layout="fill"
                            objectFit="cover"
                            alt="garden-image"
                        />
                    </figure>
                </Col>
                <Col md={12} lg={5} className="d-flex">
                    {serviceProvider &&
                        serviceProvider.map((provider) => (
                            <SimpleProfileCard
                                image={provider.image}
                                key={provider.id}
                                name={provider.name}
                                views={provider.views}
                                address={provider.address}
                                happyClients={provider.happyClients}
                                successRate={provider.successRate}
                                speciality={provider.speciality}
                                startingPrice={provider.startingPrice}
                            />
                        ))}
                </Col>
            </Row>
            <div className="d-flex mt-4 task-detail__loc-time">
                <p>
                    <FontAwesomeIcon
                        icon={faLocationDot}
                        className="svg-icon svg-icon-location"
                    />
                    Buddhanagar, Kathmandu
                </p>
                <p>
                    <FontAwesomeIcon
                        icon={faCalendar}
                        className="svg-icon svg-icon-calender"
                    />
                    June 9, 2022
                </p>
                <p>
                    <FontAwesomeIcon
                        icon={faClockEight}
                        className="svg-icon svg-icon-clock"
                    />
                    08:11 PM
                </p>
                <p>
                    <FontAwesomeIcon
                        icon={faEye}
                        className="svg-icon svg-icon-eye"
                    />
                    2500 Views
                </p>
                <p>
                    <FontAwesomeIcon
                        icon={faUserGroup}
                        className="svg-icon svg-icon-user-group"
                    />
                    100 Applied
                </p>
            </div>

            <div className="task-detail__desc">
                <h3>Description</h3>
                <p>
                    Hiring a reputable professional landscape gardener entail
                    paying for their knowledge, experience, time, equipment, and
                    materials. They will be able to discuss your vision and
                    tailor your garden design to your exact needs, taking into
                    account your taste, lifestyle, budget.
                </p>
            </div>

            <h3>Requirements</h3>
            <div className="mt-5">
                {serviceHighlights &&
                    serviceHighlights.map((name) => (
                        <div key={name.id}>
                            <ServiceHighlights title={name.title} />
                        </div>
                    ))}
            </div>
            <Tab
                activeIndex={activeTabIdx}
                onTabClick={setActiveTabIdx}
                items={[
                    { title: "Taskers(10)", content: <TaskersTab /> },
                    { title: "Timeline", content: <div>Service</div> },
                    { title: "Collaboration(50)", content: <Collaboration /> },
                ]}
            />
        </div>
    );
};

export default AppliedTaskDetail;
