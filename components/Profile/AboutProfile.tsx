import { faPencil } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { useGetTaskerEducation } from "hooks/user-education/useGetEducation";
import { useGetTaskerExperience } from "hooks/user-experience/useGetExperience";
import { useGetTaskerPortfolio } from "hooks/user-portfolio/useGetPortfolio";
import Image from "next/image";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { ProfileAboutContent } from "staticData/profileAboutContent";

import AddPortfolio from "./AddPortfolio";
import CertificationForm from "./CertificationForm";
import EditProfileButton from "./EditProfileButton";
import EducationForm from "./EducationForm";
import ExperienceForm from "./ExperienceForm";
import AddSkills from "./SkillsForm";

const AboutProfile = () => {
    const [showExpForm, setShowExpForm] = useState(false);
    const [showAddPortfolioModal, setShowAddPortfolioModal] = useState(false);
    const [showAddSkillsForm, setShowAddSkillsForm] = useState(false);
    const [showCertificationModal, setShowCertificationModal] = useState(false);
    const [showEducationForm, setShowEducationForm] = useState(false);

    //user profile education data
    const { data: EducationData } = useGetTaskerEducation();
    const userEducation = EducationData?.data?.result;

    //user profile experience data
    const { data: ExperienceData } = useGetTaskerExperience();
    const userExperience = ExperienceData?.data?.result;

    //user profile experience data
    const { data: PortfolioData } = useGetTaskerPortfolio();
    const userPortfolio = PortfolioData?.data?.result;
    //console.log()
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
                                {userPortfolio?.map((info: any) => (
                                    <div className="image" key={info?.id}>
                                        <figure className="thumbnail-img">
                                            <Image
                                                src={info?.image}
                                                layout="fill"
                                                objectFit="cover"
                                                alt="portfolio-image"
                                            />
                                        </figure>
                                        <figure className="thumbnail-img">
                                            <Image
                                                src={info?.file}
                                                layout="fill"
                                                objectFit="cover"
                                                alt="portfolio-file"
                                            />
                                        </figure>
                                        <p>{info.title}</p>
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
                                        {userExperience?.map((info: any) => (
                                            <div
                                                className="experience__type"
                                                key={info?.id}
                                            >
                                                <div className="name d-flex">
                                                    <h3>{info?.title}</h3>
                                                    <FontAwesomeIcon
                                                        icon={faPencil}
                                                        className="svg-icon"
                                                        onClick={() =>
                                                            setShowExpForm(
                                                                !showExpForm
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="company d-flex">
                                                    <p className="name">
                                                        {info?.company_name}
                                                        &nbsp;. &nbsp;
                                                        {info?.employment_type}
                                                    </p>
                                                </div>
                                                <p className="description">
                                                    {info?.description}
                                                </p>
                                                <p className="date">
                                                    {format(
                                                        new Date(
                                                            info?.start_date
                                                        ),
                                                        "MMMM yyyy"
                                                    )}
                                                    {`${
                                                        info?.end_date
                                                            ? `-`
                                                            : "- Present"
                                                    }`}
                                                    {info?.end_date &&
                                                        format(
                                                            new Date(
                                                                info.end_date
                                                            ),
                                                            "MMMM yyyy"
                                                        )}
                                                </p>
                                                <p className="address">
                                                    {info.location}
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
                                        setShowAddSkillsForm(!showAddSkillsForm)
                                    }
                                />
                                <AddSkills
                                    show={showAddSkillsForm}
                                    setShowAddSkillsForm={setShowAddSkillsForm}
                                    handleClose={() =>
                                        setShowAddSkillsForm(false)
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
                                    handleClose={() =>
                                        setShowEducationForm(false)
                                    }
                                />
                            </div>
                            <Row>
                                <Col md={9}>
                                    <div className="content">
                                        {userEducation?.map((info: any) => (
                                            <div
                                                className="education__type"
                                                key={info.id}
                                            >
                                                <div className="name d-flex">
                                                    <h3 className="institution">
                                                        {info.school}
                                                    </h3>
                                                    <FontAwesomeIcon
                                                        icon={faPencil}
                                                        className="svg-icon"
                                                        onClick={() =>
                                                            setShowEducationForm(
                                                                !showEducationForm
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <h3 className="program">
                                                    {info.degree}
                                                </h3>

                                                <p className="date">
                                                    {format(
                                                        new Date(
                                                            info.start_date
                                                        ),
                                                        "MMMM yyyy"
                                                    )}
                                                    -
                                                    {format(
                                                        new Date(info.end_date),
                                                        "MMMM yyyy"
                                                    )}
                                                </p>
                                                <p className="address">
                                                    {info.location}
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
                            show={showAddPortfolioModal}
                            setShowAddPortfolioModal={setShowAddPortfolioModal}
                            handleClose={() => setShowAddPortfolioModal(false)}
                        />
                    </div>
                ))}
        </>
    );
};
export default AboutProfile;
