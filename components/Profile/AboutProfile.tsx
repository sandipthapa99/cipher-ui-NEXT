import { faEdit } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { ProfileAboutContent } from "staticData/profileAboutContent";

import AddPortfolio from "./AddPortfolio";
import EditProfileButton from "./EditProfileButton";
import ExperienceForm from "./ExperienceForm";

const AboutProfile = () => {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            {ProfileAboutContent &&
                ProfileAboutContent.map((about) => (
                    <div className="about-profile" key={about.id}>
                        <div className="type portfolio">
                            <div className="title-wrapper d-flex justify-content-between">
                                {/* <h2 className="heading-title">Community activity</h2> */}
                                <h1>My Portfolio</h1>
                                <EditProfileButton
                                    text="Add New"
                                    showModal={true}
                                    handleOnClick={() =>
                                        setShowModal(!showModal)
                                    }
                                />
                            </div>

                            <div className="content">
                                {about.portfolio.map((info) => (
                                    <div className="image" key={info.id}>
                                        <figure className="thumbnail-img">
                                            <Image
                                                src={info.image}
                                                layout="fill"
                                                objectFit="cover"
                                                alt="portfolio-image"
                                            />
                                        </figure>
                                        <p>{info.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="type experience">
                            <div className="title-wrapper d-flex justify-content-between">
                                {/* <h2 className="heading-title">Community activity</h2> */}
                                <h1>Experience</h1>
                                <span onClick={() => setShowModal(!showModal)}>
                                    Add New
                                </span>
                                <ExperienceForm
                                    show={showModal}
                                    setShowModal={setShowModal}
                                    handleClose={() => setShowModal(false)}
                                />
                            </div>

                            <Row>
                                <Col md={9}>
                                    <div className="content">
                                        {about.experience.map((info) => (
                                            <div
                                                className="experience__type"
                                                key={info.id}
                                            >
                                                <div className="name d-flex">
                                                    <h3>{info.name}</h3>
                                                    <FontAwesomeIcon
                                                        icon={faEdit}
                                                        className="svg-icon"
                                                    />
                                                </div>
                                                <div className="company d-flex">
                                                    <p className="name">
                                                        {info.company}
                                                    </p>
                                                    <p className="job-type">
                                                        {info.jobType}
                                                    </p>
                                                </div>
                                                <p className="description">
                                                    {info.description}
                                                </p>
                                                <p className="date">
                                                    {info.dateFrom}-
                                                    {info.dateTo}
                                                </p>
                                                <p className="address">
                                                    {info.address}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className="type skills">
                            <div className="title-wrapper d-flex justify-content-between">
                                {/* <h2 className="heading-title">Community activity</h2> */}
                                <h1>Skills</h1>
                                <a href="#!">Add New</a>
                            </div>

                            <Row>
                                <Col md={9}>
                                    <div className="content">
                                        {about.skills.map((info) => (
                                            <div
                                                className="skills__type"
                                                key={info.id}
                                            >
                                                {info.name}
                                            </div>
                                        ))}
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className="type education">
                            <div className="title-wrapper d-flex justify-content-between">
                                {/* <h2 className="heading-title">Community activity</h2> */}
                                <h1>Education</h1>
                                <a href="#!">Add New</a>
                            </div>
                            <Row>
                                <Col md={9}>
                                    <div className="content">
                                        {about.education.map((info) => (
                                            <div
                                                className="education__type"
                                                key={info.id}
                                            >
                                                <div className="name d-flex">
                                                    <h3 className="institution">
                                                        {info.institution}
                                                    </h3>
                                                    <FontAwesomeIcon
                                                        icon={faEdit}
                                                        className="svg-icon"
                                                    />
                                                </div>
                                                <h3 className="program">
                                                    {info.program}
                                                </h3>

                                                <p className="date">
                                                    {info.dateFrom}-
                                                    {info.dateTo}
                                                </p>
                                                <p className="address">
                                                    {info.address}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className="type certification">
                            <div className="title-wrapper d-flex justify-content-between">
                                {/* <h2 className="heading-title">Community activity</h2> */}
                                <h1>Certifications</h1>
                                <a href="#!">Add New</a>
                            </div>
                            <Row>
                                <Col md={9}>
                                    <div className="content">
                                        {about.certifications.map((info) => (
                                            <div
                                                className="certification__type"
                                                key={info.id}
                                            >
                                                <div className="name d-flex">
                                                    <h3 className="institution">
                                                        {info.name}
                                                    </h3>
                                                    <FontAwesomeIcon
                                                        icon={faEdit}
                                                        className="svg-icon"
                                                    />
                                                </div>
                                                <h3 className="program">
                                                    {info.program}
                                                </h3>
                                                <p className="date">
                                                    {info.dateFrom}-
                                                    {info.dateTo}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <AddPortfolio
                            showModal={showModal}
                            handleClose={() => setShowModal(false)}
                        />
                    </div>
                ))}
        </>
    );
};
export default AboutProfile;
