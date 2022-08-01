import { faPencil } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { ProfileAboutContent } from "staticData/profileAboutContent";

import AddPortfolio from "./AddPortfolio";
import CertificationForm from "./CertificationForm";
import EditProfileButton from "./EditProfileButton";
import EducationForm from "./EducationForm";
import ExperienceForm from "./ExperienceForm";

const AboutProfile = () => {
    const [showExpForm, setShowExpForm] = useState(false);
    const [showAddPortfolioModal, setShowAddPortfolioModal] = useState(false);
    const [showAddSkillsModal, setShowAddSkillsModal] = useState(false);
    const [showCertificationModal, setShowCertificationModal] = useState(false);
    const [showEducationForm, setShowEducationForm] = useState(false);

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
                                        setShowAddPortfolioModal(
                                            !showAddPortfolioModal
                                        )
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
                                <EditProfileButton
                                    text="Add New"
                                    showModal={true}
                                    handleOnClick={() =>
                                        setShowExpForm(!showExpForm)
                                    }
                                />
                                <ExperienceForm
                                    show={showExpForm}
                                    setShowExpForm={setShowExpForm}
                                    handleClose={() => setShowExpForm(false)}
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
                                                        icon={faPencil}
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
                                <EditProfileButton
                                    text="Add New"
                                    showModal={true}
                                    handleOnClick={() =>
                                        setShowAddSkillsModal(
                                            !showAddSkillsModal
                                        )
                                    }
                                />
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
                                <EditProfileButton
                                    text="Add New"
                                    showModal={true}
                                    handleOnClick={() =>
                                        setShowEducationForm(!showEducationForm)
                                    }
                                />
                                <EducationForm
                                    show={showEducationForm}
                                    setShowEducationForm={setShowEducationForm}
                                    handleClose={() => setShowExpForm(false)}
                                />
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
                                                        icon={faPencil}
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
                                <EditProfileButton
                                    text="Add New"
                                    showModal={true}
                                    handleOnClick={() =>
                                        setShowCertificationModal(
                                            !showCertificationModal
                                        )
                                    }
                                />
                                <CertificationForm
                                    show={showCertificationModal}
                                    setShowCertificationModal={
                                        setShowCertificationModal
                                    }
                                    handleClose={() =>
                                        setShowCertificationModal(false)
                                    }
                                />
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
                                                        icon={faPencil}
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
                            showModal={showAddPortfolioModal}
                            handleClose={() => setShowAddPortfolioModal(false)}
                        />
                    </div>
                ))}
        </>
    );
};
export default AboutProfile;
