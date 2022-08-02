import {
    faBadge,
    faEllipsisVertical,
    faHeart,
    faLocation,
    faShare,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { Col, Row } from "react-bootstrap";
import type { MerchantProfileInfoProps } from "types/merchantProfile";

const MerchantProfileCard = ({
    merchantImage,
    merchantJob,
    merchantOrganization,
    merchantLocation,
    merchantBio,
    merchantRating,
    merchantPrice,
    happyClients,
    successRate,
    taskCompleted,
    activeFrom,
    activeTo,
    memberSince,
    moreServices,
}: MerchantProfileInfoProps) => {
    return (
        <div className="merchant-card-block">
            <Row>
                <Col md={3} className="merchant-card-block__profile">
                    <figure className="thumbnail-img">
                        <Image
                            src={merchantImage}
                            layout="fill"
                            // height={300}
                            objectFit="cover"
                            alt="merchant-profile-image"
                        />
                    </figure>
                    <div className="profile-intro d-flex">
                        <h1 className="job">I am the {merchantJob}</h1>
                        <div className="active"></div>
                    </div>
                    <p className="organization">
                        Organization | {merchantOrganization}
                    </p>
                    <div className="rating">
                        {Array.from({ length: merchantRating }, (_, i) => (
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
                    </div>
                    <div className="price">${merchantPrice}/hr</div>
                    <button className="button">Hire Me</button>
                </Col>

                <Col md={9} className="merchant-card-block__general-info">
                    <Row className="top-container">
                        <Col md={7}>
                            <h1>General Information</h1>

                            <div className="content">
                                <div className="type d-flex flex-col">
                                    <FontAwesomeIcon
                                        icon={faLocation}
                                        className="thumbnail-img"
                                    />

                                    <p>{merchantLocation}</p>
                                </div>
                                <div className="type d-flex flex-col">
                                    <FontAwesomeIcon
                                        icon={faLocation}
                                        className="thumbnail-img"
                                    />
                                    <p>
                                        &nbsp;Active Hours {activeFrom}:00 AM to{" "}
                                        {activeTo}:00 PM
                                    </p>
                                </div>
                                <div className="type d-flex flex-col">
                                    <FontAwesomeIcon
                                        icon={faLocation}
                                        className="thumbnail-img"
                                    />
                                    <p>Member Since &nbsp;{memberSince}</p>
                                </div>

                                <div className="success-rate type d-flex flex-col">
                                    <div className="count d-flex flex-row">
                                        <FontAwesomeIcon
                                            icon={faBadge}
                                            className="thumbnail-img"
                                        />
                                        <p>{moreServices}</p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={5}>
                            <div className="reactions d-flex">
                                <div className="d-flex flex-col save">
                                    <FontAwesomeIcon
                                        icon={faHeart}
                                        className="svg-icon heart"
                                    />
                                </div>
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
                                <p className="details">{merchantBio}</p>
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
export default MerchantProfileCard;
