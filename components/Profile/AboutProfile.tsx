import Reviews from "@components/common/Reviews";
import SelectInputField from "@components/common/SelectInputField";
import { faPencil } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { Formik } from "formik";
import { useGetProfile } from "hooks/profile/useGetProfile";
import { useData } from "hooks/use-data";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { reviewsContent } from "staticData/reviews";
import type { UserProfileProps } from "types/userProfileProps";
import HomeSearchSchema from "utils/formValidation/homeSearchValidation";
import { HomeSearchdata } from "utils/homeSearchData";
import { personType, reviewType } from "utils/options";

import AddPortfolio from "./AddPortfolio";
import CertificationForm from "./CertificationForm";
import EditProfileButton from "./EditProfileButton";
import EducationForm from "./EducationForm";
import ExperienceForm from "./ExperienceForm";
import AddSkills from "./SkillsForm";
const skills = [
    {
        id: "0",
        name: "Planting",
    },
    {
        id: "1",
        name: "Washing",
    },
    {
        id: "2",
        name: "Cleaning",
    },
];
const AboutProfile = () => {
    const [showExpForm, setShowExpForm] = useState(false);
    const [showAddPortfolioModal, setShowAddPortfolioModal] = useState(false);
    const [showAddSkillsForm, setShowAddSkillsForm] = useState(false);
    const [showCertificationModal, setShowCertificationModal] = useState(false);
    const [showEducationForm, setShowEducationForm] = useState(false);

    const [id, setId] = useState<number | undefined>();

    //user profile certification data
    const { data: certificationData } = useData<
        UserProfileProps["certificationData"]
    >(["tasker-certification"], "/tasker/certification/");

    //user profile education data
    const { data: educationData } = useData<UserProfileProps["educationData"]>(
        ["tasker-education"],
        "/tasker/education/"
    );

    //user profile experience data
    const { data: experienceData } = useData<
        UserProfileProps["experienceData"]
    >(["tasker-experience"], "/tasker/experience/");

    //user profile experience data
    const { data: portfolioData } = useData<UserProfileProps["portfolioData"]>(
        ["tasker-portfolio"],
        "/tasker/portfolio/"
    );

    const handleEdit = useCallback((id: any) => {
        setShowExpForm(!showExpForm);
        setId(id);
    }, []);

    const { data: profileDetails } = useGetProfile();

    console.log("profile=", profileDetails);
    const userSkills = profileDetails ? JSON.parse(profileDetails?.skill) : [];
    console.log("user profile skills=", userSkills);

    return (
        <>
            <div className="about-profile">
                <div className="type portfolio">
                    <div className="title-wrapper d-flex justify-content-between">
                        {/* <h2 className="heading-title">Community activity</h2> */}
                        <h1>My Portfolio</h1>
                        <EditProfileButton
                            text="Add New"
                            showModal={true}
                            handleOnClick={() =>
                                setShowAddPortfolioModal(!showAddPortfolioModal)
                            }
                        />
                    </div>
                    <AddPortfolio
                        show={showAddPortfolioModal}
                        setShowAddPortfolioModal={setShowAddPortfolioModal}
                        handleClose={() => setShowAddPortfolioModal(false)}
                    />

                    <div className="content">
                        {portfolioData
                            ? portfolioData?.data?.result?.map((info: any) => (
                                  <div className="image" key={info?.id}>
                                      <Row className="gx-5">
                                          <Col
                                              md={info?.image ? 6 : 12}
                                              sm={info?.image ? 6 : 12}
                                              xs={info?.image ? 6 : 12}
                                          >
                                              <Link href={`${info?.image}`}>
                                                  <a target="_blank">
                                                      {info?.image ? (
                                                          <figure className="thumbnail-img">
                                                              <Image
                                                                  src={`${info?.image}`}
                                                                  layout="fill"
                                                                  objectFit="cover"
                                                                  alt="portfolio-image"
                                                              />
                                                          </figure>
                                                      ) : (
                                                          ""
                                                      )}
                                                  </a>
                                              </Link>
                                          </Col>
                                          <Col
                                              md={info?.file ? 6 : 12}
                                              sm={info?.image ? 6 : 12}
                                              xs={info?.image ? 6 : 12}
                                          >
                                              <Link href={`${info?.file}`}>
                                                  <a target="_blank">
                                                      {info?.file ? (
                                                          <figure className="thumbnail-img">
                                                              <Image
                                                                  src="/userprofile/documents/pdf.svg"
                                                                  layout="fill"
                                                                  objectFit="cover"
                                                                  alt="portfolio-file"
                                                              />
                                                          </figure>
                                                      ) : (
                                                          ""
                                                      )}
                                                  </a>
                                              </Link>
                                          </Col>
                                      </Row>

                                      <p className="text-center">
                                          {info.title}
                                      </p>
                                  </div>
                              ))
                            : "Looks like you have no Portfolio data"}
                    </div>
                </div>
                <div className="type experience">
                    <div className="title-wrapper d-flex justify-content-between">
                        {/* <h2 className="heading-title">Community activity</h2> */}
                        <h1>Experience</h1>
                        <EditProfileButton
                            text="Add New"
                            showModal={true}
                            handleOnClick={() => setShowExpForm(!showExpForm)}
                        />
                        <ExperienceForm
                            show={showExpForm}
                            setShowExpForm={setShowExpForm}
                            handleClose={() => setShowExpForm(false)}
                            id={id}
                        />
                    </div>

                    <Row>
                        <Col md={9}>
                            <div className="content">
                                {experienceData
                                    ? experienceData?.data?.result?.map(
                                          (value, key) => (
                                              <div
                                                  className="experience__type"
                                                  key={key}
                                              >
                                                  <div className="name d-flex">
                                                      <h3>{value?.title}</h3>
                                                      <FontAwesomeIcon
                                                          icon={faPencil}
                                                          className="svg-icon"
                                                          onClick={() =>
                                                              handleEdit(
                                                                  value?.id
                                                              )
                                                          }
                                                      />
                                                  </div>
                                                  <div className="company d-flex">
                                                      <p className="name">
                                                          {value?.company_name}
                                                          &nbsp;. &nbsp;
                                                          {
                                                              value?.employment_type
                                                          }
                                                      </p>
                                                  </div>
                                                  <p className="description">
                                                      {value?.description}
                                                  </p>
                                                  <p className="date">
                                                      {format(
                                                          new Date(
                                                              value?.start_date
                                                          ),
                                                          "MMMM yyyy"
                                                      )}
                                                      {`${
                                                          value?.end_date
                                                              ? `-`
                                                              : "- Present"
                                                      }`}
                                                      {value?.end_date &&
                                                          format(
                                                              new Date(
                                                                  value.end_date
                                                              ),
                                                              "MMMM yyyy"
                                                          )}
                                                  </p>
                                                  <p className="address">
                                                      {value.location}
                                                  </p>
                                              </div>
                                          )
                                      )
                                    : "Looks like you have no Experience Data"}
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
                            handleClose={() => setShowAddSkillsForm(false)}
                        />
                    </div>

                    <Row>
                        <Col md={9}>
                            <div className="content">
                                {userSkills.map((info: any, i: any) => (
                                    <div className="skills__type" key={i}>
                                        {info}
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
                            handleClose={() => setShowEducationForm(false)}
                            id={id}
                        />
                    </div>
                    <Row>
                        <Col md={9}>
                            <div className="content">
                                {educationData
                                    ? educationData?.data.result.map(
                                          (value: any, key) => (
                                              <div
                                                  className="education__type"
                                                  key={key}
                                              >
                                                  <div className="name d-flex">
                                                      <h3 className="institution">
                                                          {value.school}
                                                      </h3>
                                                      <FontAwesomeIcon
                                                          icon={faPencil}
                                                          className="svg-icon"
                                                          onClick={() => {
                                                              setShowEducationForm(
                                                                  !showEducationForm
                                                              );
                                                              setId(value?.id);
                                                          }}
                                                      />
                                                  </div>
                                                  <h3 className="program">
                                                      {value.degree}
                                                  </h3>

                                                  <p className="date">
                                                      {format(
                                                          new Date(
                                                              value.start_date
                                                          ),
                                                          "MMMM yyyy"
                                                      )}
                                                      -
                                                      {format(
                                                          new Date(
                                                              value.end_date
                                                          ),
                                                          "MMMM yyyy"
                                                      )}
                                                  </p>
                                                  <p className="address">
                                                      {value.location}
                                                  </p>
                                              </div>
                                          )
                                      )
                                    : "Looks like you have no Education Data"}
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
                            handleClose={() => setShowCertificationModal(false)}
                            id={id}
                        />
                    </div>
                    <Row>
                        <Col md={9}>
                            <div className="content">
                                {certificationData
                                    ? certificationData?.data.result?.map(
                                          (value, key) => (
                                              <div
                                                  className="certification__type"
                                                  key={key}
                                              >
                                                  <div className="name d-flex">
                                                      {/* <Link
                                                          href={
                                                              value?.certificate_url
                                                          }
                                                      > */}
                                                      <a
                                                          href={
                                                              value?.certificate_url
                                                          }
                                                          target="_blank"
                                                          rel="noreferrer"
                                                      >
                                                          <h3 className="institution">
                                                              {value?.name}
                                                          </h3>
                                                      </a>
                                                      {/* </Link> */}

                                                      <FontAwesomeIcon
                                                          icon={faPencil}
                                                          className="svg-icon"
                                                          onClick={() => {
                                                              setShowCertificationModal(
                                                                  !showCertificationModal
                                                              );
                                                              setId(value?.id);
                                                          }}
                                                      />
                                                  </div>
                                                  <h3 className="program">
                                                      {value?.description}
                                                  </h3>
                                                  <p className="date">
                                                      {format(
                                                          new Date(
                                                              value?.issued_date
                                                          ),
                                                          "MMMM yyyy"
                                                      )}
                                                      {`${
                                                          value?.expire_date
                                                              ? `-`
                                                              : "- Present"
                                                      }`}
                                                      {value?.expire_date &&
                                                          format(
                                                              new Date(
                                                                  value.expire_date
                                                              ),
                                                              "MMMM yyyy"
                                                          )}
                                                  </p>
                                              </div>
                                          )
                                      )
                                    : "Looks like you have no certificates"}
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="reviews">
                    <Row className="type head-container">
                        <Col md={6}>
                            <h3>
                                My Reviews <span>(3,0003)</span>{" "}
                            </h3>
                        </Col>
                        <Col md={6}>
                            <Row className="select-field">
                                <Col md={6}>
                                    <Formik
                                        initialValues={HomeSearchdata}
                                        validationSchema={HomeSearchSchema}
                                        onSubmit={async (values) =>
                                            console.log(values)
                                        }
                                    >
                                        <SelectInputField
                                            name="review"
                                            options={personType}
                                            fieldRequired
                                            placeHolder="Tasker"
                                        />
                                    </Formik>
                                </Col>
                                <Col md={6}>
                                    <Formik
                                        initialValues={HomeSearchdata}
                                        validationSchema={HomeSearchSchema}
                                        onSubmit={async (values) => {
                                            console.log(values);
                                        }}
                                    >
                                        <SelectInputField
                                            name="review"
                                            options={reviewType}
                                            placeholder="Most Relevant"
                                            fieldRequired
                                            placeHolder="Most Relevant"
                                        />
                                    </Formik>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <div className="review-container">
                        <Row className="gx-5 type">
                            {reviewsContent &&
                                reviewsContent.map((review) => (
                                    <Col md={8} key={review.id}>
                                        <Reviews
                                            name={review.name}
                                            ratings={review.ratings}
                                            description={review.description}
                                            time={review.time}
                                            image={review.image}
                                        />
                                    </Col>
                                ))}
                            <Link href="#!">See all reviews</Link>
                        </Row>
                    </div>
                </div>
            </div>
        </>
    );
};
export default AboutProfile;
