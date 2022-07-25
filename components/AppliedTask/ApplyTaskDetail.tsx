import ServiceHighlights from "@components/common/ServiceHighlights";
import SimpleProfileCard from "@components/common/SimpleProfileCard";
import {
    faChevronLeft,
    faEllipsisVertical,
    faHeart,
    faShare,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import { serviceHighlights } from "staticData/serviceHighlights";
import { serviceProvider } from "staticData/serviceProvider";

const ApplyTaskDetail: NextPage = () => {
    return (
        <div className="task-deatil p-5">
            <Link href={""}>
                <a>
                    <FontAwesomeIcon icon={faChevronLeft} className="svg-icon" />
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
                <Col md={12} lg={5} className="gardener-col">
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

            <h1>Description</h1>
            <p>
                Hiring a reputable professional landscape gardener entail paying for
                their knowledge, experience, time, equipment, and materials. They
                will be able to discuss your vision and tailor your garden design to
                your exact needs, taking into account your taste, lifestyle, budget.
            </p>

            <h1>Highlights</h1>

            <Row className="content flex-column">
                {serviceHighlights &&
                    serviceHighlights.map((name) => (
                        <Col key={name.id}>
                            <ServiceHighlights
                                isChecked={name.isChecked}
                                title={name.title}
                            />
                        </Col>
                    ))}
            </Row>
        </div>
    );
};

export default ApplyTaskDetail;
