import type { NextPage } from "next";
import { Col, Row } from "react-bootstrap";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHeart,
    faShare,
    faChevronLeft,
    faEllipsisVertical,
    faLocationDot,
    faCalendar,
    faUserGroup,
    faEye,
    faClockEight,
} from "@fortawesome/pro-regular-svg-icons";
import { serviceProvider } from "staticData/serviceProvider";
import ServiceHighlights from "@components/common/ServiceHighlights";
import { serviceHighlights } from "staticData/serviceHighlights";
import Link from "next/link";
import SimpleProfileCard from "@components/common/SimpleProfileCard";

const AppliedTaskDetail: NextPage = () => {
    return (
        <div className="task-deatil p-5">
            <Link href={""}>
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
            <div className="d-flex mt-4 task-deatil__loc-time">
                <p>
                    <FontAwesomeIcon
                        icon={faLocationDot}
                        className="svg-icon-location"
                    />
                    Buddhanagar, Kathmandu
                </p>
                <p>
                    <FontAwesomeIcon
                        icon={faCalendar}
                        className="svg-icon-calender"
                    />
                    June 9, 2022
                </p>
                <p>
                    <FontAwesomeIcon
                        icon={faClockEight}
                        className="svg-icon-clock"
                    />
                    08:11 PM
                </p>
                <p>
                    <FontAwesomeIcon icon={faEye} className="svg-icon-eye" />
                    2500 Views
                </p>
                <p>
                    <FontAwesomeIcon
                        icon={faUserGroup}
                        className="svg-icon-user-group"
                    />
                    100 Applied
                </p>
            </div>

            <div className="task-deatil__desc">
                <h3>Description</h3>
                <p>
                    Hiring a reputable professional landscape gardener entail
                    paying for their knowledge, experience, time, equipment, and
                    materials. They will be able to discuss your vision and
                    tailor your garden design to your exact needs, taking into
                    account your taste, lifestyle, budget.
                </p>
            </div>

            <h3>Highlights</h3>
            <div className="mt-5">
                {serviceHighlights &&
                    serviceHighlights.map((name) => (
                        <div key={name.id}>
                            <ServiceHighlights title={name.title} />
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default AppliedTaskDetail;
