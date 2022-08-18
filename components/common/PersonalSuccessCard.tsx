import { faCircleQuestion } from "@fortawesome/pro-regular-svg-icons";
import { faStar } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";
import { Col, Row } from "react-bootstrap";
import type { SuccessStoryProps } from "types/successStory";

export const PersonalSuccessCard = ({
    successStoryData,
}: {
    successStoryData: SuccessStoryProps;
}) => {
    return (
        <>
            {successStoryData?.result?.map((value, key) => (
                <div className="personal-success-card" key={key}>
                    <Row className="d-flex">
                        <Col md={5} sm={12}>
                            {value.profile_image && (
                                <figure className="d-flex justify-content-center justify-content-md-start success-image">
                                    <Image
                                        src={value.profile_image}
                                        alt="growyourbusiness-image"
                                        height={550}
                                        width={500}
                                    />
                                </figure>
                            )}
                        </Col>
                        <Col md={7} sm={12}>
                            <div
                                className="d-flex flex-column justify-content-center  personal-success-card__content"
                                key={key}
                            >
                                <h3>{value.full_name}</h3>
                                <h6>Specialities: {value.specialities}</h6>
                                <p>“{value.content}“</p>
                                <h4>Badges</h4>
                                <div className="d-flex flex-column flex-sm-row align-items-stretch badge-section">
                                    <figure className="mx-auto mx-sm-0 badge-section__img">
                                        <Image
                                            src={
                                                "/utility-images/award-image.png"
                                            }
                                            alt="badge image"
                                            layout="fill"
                                        />
                                    </figure>

                                    <div className="description">
                                        <div className="d-flex title">
                                            <h5>Platinum Badge</h5>
                                            <span>
                                                <FontAwesomeIcon
                                                    icon={faCircleQuestion}
                                                />
                                            </span>
                                        </div>
                                        <h6>
                                            Based on Completion Rating &
                                            Earnings
                                        </h6>
                                    </div>
                                </div>
                                <div className="d-flex footer">
                                    <span>
                                        <FontAwesomeIcon icon={faStar} />
                                    </span>
                                    <span>4.5 stars from 400 reviews</span>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            ))}
        </>
    );
};
