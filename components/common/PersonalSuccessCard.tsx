import { HelpOutline, StarRounded } from "@mui/icons-material";
import Image from "next/image";
import React from "react";
import { Col, Row } from "react-bootstrap";
import type { SuccessStoryProps } from "types/successStory";

export const PersonalSuccessCard = ({
    successStoryData,
}: {
    successStoryData: SuccessStoryProps["result"][0];
}) => {
    return (
        <>
            <div className="personal-success-card">
                <Row className="d-flex">
                    <Col md={5} sm={12}>
                        {successStoryData?.profile_image && (
                            <figure className="d-flex justify-content-center justify-content-md-start success-image">
                                <Image
                                    src={
                                        successStoryData?.profile_image ??
                                        "/userprofile/unknownPerson.jpg"
                                    }
                                    alt="growyourbusiness-image"
                                    height={480}
                                    width={480}
                                />
                            </figure>
                        )}
                    </Col>
                    <Col md={7} sm={12}>
                        <div className="d-flex flex-column justify-content-center  personal-success-card__content">
                            <h3>{successStoryData?.full_name}</h3>
                            {successStoryData?.specialities && (
                                <h6>
                                    Specialities:{" "}
                                    {successStoryData?.specialities}
                                </h6>
                            )}
                            <div
                                className="success-story-description"
                                dangerouslySetInnerHTML={{
                                    __html: successStoryData?.content,
                                }}
                            ></div>
                            <h4>Badges</h4>
                            <div className="d-flex flex-column flex-sm-row align-items-stretch badge-section">
                                <figure className="mx-auto mx-sm-0 badge-section__img">
                                    <Image
                                        src={"/utility-images/award-image.png"}
                                        alt="badge image"
                                        layout="fill"
                                    />
                                </figure>

                                <div className="description">
                                    <div className="d-flex title">
                                        <h5>Platinum Badge</h5>
                                        <span>
                                            <HelpOutline />
                                        </span>
                                    </div>
                                    <h6>
                                        Based on Completion Rating & Earnings
                                    </h6>
                                </div>
                            </div>
                            <div className="d-flex footer">
                                <span>
                                    <StarRounded />
                                </span>
                                <span>4.5 stars from 400 reviews</span>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
};
