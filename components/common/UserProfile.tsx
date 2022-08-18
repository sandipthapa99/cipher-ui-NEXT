import PhotoEdit from "@components/Profile/PhotoEdit";
import {
    faAt,
    faCircleQuestion,
    faEllipsisVertical,
    faLocationDot,
    faPhone,
    faShare,
    faSparkles,
    faStar,
    faTimer,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetCountryBYId } from "hooks/profile/getCountryById";
import Image from "next/image";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import type { UserProfileInfoProps } from "types/userProfile";

import ProfileEditForm from "./ProfileEditForm";
import TooltipMessage from "./Tooltip";

const UserProfileCard = ({
    userImage,
    userJob,
    userName,
    userRating,
    userPrice,
    userLocation,
    userPhone,
    userEmail,
    moreServices,
    activeFrom,
    activeTo,
    userBio,
    userBadge,
    userPoints,
    pointGoal,
    happyClients,
    successRate,
    taskCompleted,
    tooltipMessage,
    countryCode,
}: UserProfileInfoProps) => {
    const [showEdit, setShowEdit] = useState(false);
    const [showExpForm, setShowExpForm] = useState(false);
    const { data: country } = useGetCountryBYId(countryCode);
    console.log("skills", moreServices, typeof moreServices);

    const services = moreServices ? JSON.parse(moreServices) : [];

    const renderServices = services?.map((service, index) => (
        <p key={index}>{service}</p>
    ));
    const userType = userJob ? JSON.parse(userJob) : [];
    const renderType = userType.map((type, index) => {
        return (
            <p className="organization" key={index}>
                Individual | {type}
            </p>
        );
    });

    return (
        <div className="profile-card-block">
            <Row>
                <Col md={3} className="profile-card-block__profile">
                    <figure
                        className="thumbnail-img"
                        onClick={() => setShowExpForm(!showExpForm)}
                    >
                        <Image
                            src={userImage}
                            layout="fill"
                            objectFit="cover"
                            alt="user-profile-image"
                            className="rounded-circle"
                        />
                    </figure>
                    <PhotoEdit
                        photo={userImage}
                        show={showExpForm}
                        setShowExpForm={setShowExpForm}
                        handleClose={() => setShowExpForm(false)}
                    />
                    <div className="profile-intro d-flex">
                        <h1 className="name">{userName}</h1>
                        <div className="active"></div>
                    </div>
                    {renderType}
                    <div className="rating">
                        {Array.from({ length: userRating }, (_, i) => (
                            <span key={i}>
                                {" "}
                                <figure className="thumbnail-img">
                                    <Image
                                        src="/icons/rated.svg"
                                        layout="fill"
                                        objectFit="cover"
                                        alt="rated-icon"
                                    />
                                </figure>
                            </span>
                        ))}
                        {Array.from({ length: 5 - userRating }, (_, i) => (
                            <span key={i}>
                                {" "}
                                <FontAwesomeIcon
                                    icon={faStar}
                                    className="svg-icon star"
                                />
                            </span>
                        ))}
                    </div>
                    <div className="price">${userPrice}/hr</div>
                    <button
                        className="button"
                        onClick={() => setShowEdit(!showEdit)}
                    >
                        Edit Profile
                    </button>
                    <ProfileEditForm
                        show={showEdit}
                        setShowEdit={setShowEdit}
                        handleClose={() => setShowEdit(false)}
                        userName={userName}
                    />
                </Col>

                <Col md={9} className="profile-card-block__general-info">
                    <Row className="top-container">
                        <Col md={6}>
                            <h1>General Information</h1>

                            <div className="content">
                                <div className="type d-flex flex-col">
                                    <FontAwesomeIcon
                                        icon={faPhone}
                                        className="thumbnail-img"
                                    />

                                    <p>
                                        +{country?.phone_code} {userPhone}
                                    </p>
                                </div>
                                <div className="type d-flex flex-col">
                                    <FontAwesomeIcon
                                        icon={faAt}
                                        className="thumbnail-img"
                                    />

                                    <p>{userEmail}</p>
                                </div>
                                <div className="type d-flex flex-col">
                                    <FontAwesomeIcon
                                        icon={faLocationDot}
                                        className="thumbnail-img"
                                    />

                                    <p>{userLocation}</p>
                                </div>

                                <div className="type d-flex flex-col">
                                    <FontAwesomeIcon
                                        icon={faTimer}
                                        className="thumbnail-img"
                                    />
                                    <p>
                                        &nbsp;Active Hours {activeFrom} to{" "}
                                        {activeTo}:
                                    </p>
                                </div>

                                <div className="success-rate type d-flex flex-col">
                                    <div className="count d-flex flex-row">
                                        <FontAwesomeIcon
                                            icon={faSparkles}
                                            className="thumbnail-img"
                                        />
                                        <p
                                            style={{
                                                display: "flex",
                                                gap: "0.5rem",
                                            }}
                                        >
                                            {renderServices}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="reactions d-flex">
                                <div className="d-flex flex-col share">
                                    <FontAwesomeIcon
                                        icon={faShare}
                                        className="svg-icon share"
                                    />
                                </div>
                                <FontAwesomeIcon
                                    icon={faEllipsisVertical}
                                    className="svg-icon option"
                                />
                            </div>
                            <div className="bio d-flex">
                                <p className="title">Bio</p>
                                <p className="details">{userBio}</p>
                            </div>
                            <div className="user-type-status">
                                <figure className="thumbnail-img">
                                    <Image
                                        src="/userprofile/userprofile.jpg"
                                        layout="fill"
                                        objectFit="cover"
                                        alt="user-type-icon"
                                    />
                                </figure>
                                <div className="left">
                                    <div className="user-type d-flex">
                                        <TooltipMessage
                                            message={tooltipMessage}
                                            place="top"
                                        >
                                            <h1>{userBadge}</h1>
                                        </TooltipMessage>
                                        <FontAwesomeIcon
                                            icon={faCircleQuestion}
                                            className="svg-icon"
                                        />
                                    </div>

                                    <p className="user-point">
                                        {userPoints} points
                                    </p>
                                    <div className="progress-bar"></div>
                                    <p>
                                        Earn {pointGoal} points more to reach
                                        Gold
                                    </p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="d-flex status">
                        <Col md={3} xs={6}>
                            <div className="type success-rate">
                                <h1 className="number">{successRate}</h1>
                                <p>
                                    Success
                                    <br />
                                    Rate
                                </p>
                            </div>
                        </Col>
                        <Col md={3} xs={6}>
                            <div className="type happy-clients">
                                <h1 className="number">{happyClients}</h1>
                                <p>
                                    Happy
                                    <br />
                                    Clients
                                </p>
                            </div>
                        </Col>

                        <Col md={3} xs={6}>
                            <div className="type task-completed">
                                <h1 className="number">{taskCompleted}</h1>
                                <p>
                                    Tasks
                                    <br />
                                    Completed
                                </p>
                            </div>
                        </Col>
                        <Col md={3} xs={6}>
                            {" "}
                            <div className="type user-reviews">
                                <h1 className="number">{taskCompleted}</h1>
                                <p>
                                    User
                                    <br />
                                    Reviews
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};
export default UserProfileCard;
