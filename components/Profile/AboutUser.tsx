import DeleteModal from "@components/common/DeleteModal";
import Reviews from "@components/common/Reviews";
import { faPencil, faTrashCan } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spoiler } from "@mantine/core";
import urls from "constants/urls";
import { format } from "date-fns";
import { Formik } from "formik";
import { useGetProfile } from "hooks/profile/useGetProfile";
import { useData } from "hooks/use-data";
import Image from "next/image";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useToggleShowPostTaskModal } from "store/use-show-post-task";
import type { RatingResponse } from "types/ratingProps";
import type { UserProfileProps } from "types/userProfileProps";
import { reviewSearchData } from "utils/formData";
import ReviewSearchSchema from "utils/formValidation/reviewSearchSchema";

import AddPortfolio from "./AddPortfolio";
import CertificationForm from "./CertificationForm";
import EditProfileButton from "./EditProfileButton";
import EducationForm from "./EducationForm";
import ExperienceForm from "./ExperienceForm";
import PortfolioDetails from "./PortfolioDetail";
import AddSkills from "./SkillsForm";

const AboutProfile = () => {
    const [showExpForm, setShowExpForm] = useState(false);
    const [showAddPortfolioModal, setShowAddPortfolioModal] = useState(false);
    const [showAddSkillsForm, setShowAddSkillsForm] = useState(false);
    const [showCertificationModal, setShowCertificationModal] = useState(false);
    const [showEducationForm, setShowEducationForm] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showPortfolioDetails, setShowPortfolioDetails] = useState(false);
    const [modalName, setModalName] = useState("");
    const [id, setId] = useState<number | undefined>();
    const [search, setSearch] = useState("-rating");
    const [isEditProfile, setIsEditProfile] = useState(false);
    const [isOnlyPortfolioText, setIsOnlyPortfolioText] = useState(false);
    const toggleShowPostTaskModal = useToggleShowPostTaskModal();
    const { data: taskerRating } = useData<RatingResponse>(
        ["tasker-rating", search],
        `${urls.profile.rating}?ordering=${search}`
    );

    // const { mutate: searchMutation, data: filteredData } =
    //     useSearchRating<RatingResponse>(`/task/rating/?ordering=${search}`);
    // console.log("filterd reviw", filteredData?.result);

    //user profile certification data
    const { data: certificationData } = useData<
        UserProfileProps["certificationData"]
    >(["tasker-certification"], `${urls.profile.certifications}`);

    //user profile education data
    const { data: educationData } = useData<UserProfileProps["educationData"]>(
        ["tasker-education"],
        `${urls.profile.education}`
    );

    //user profile experience data
    const { data: experienceData } = useData<
        UserProfileProps["experienceData"]
    >(["tasker-experience"], `${urls.profile.experience}`);

    //user profile experience data
    const { data: portfolioData } = useData<UserProfileProps["portfolioData"]>(
        ["tasker-portfolio"],
        `${urls.profile.portfolio}`
    );

    const handleEdit = (id: any) => {
        setShowExpForm(!showExpForm);
        setId(id);
    };

    const handleDelete = (id: any, name: string) => {
        setShowDeleteModal(!showDeleteModal);
        setId(id);
        setModalName(name);
    };

    const { data: profileDetails } = useGetProfile();

    const userSkills = profileDetails ? JSON.parse(profileDetails?.skill) : [];

    const [hovered, setHovered] = useState<null | number>(null);
    const [educationHovered, setEducationHovered] = useState<null | number>(
        null
    );

    const [certificationHovered, setCertificationHovered] = useState<
        null | number
    >(null);

    const [experienceHovered, setExperienceHovered] = useState<null | number>(
        null
    );

    return (
        <>
            <div className="about-profile">
                <div className="type portfolio">
                    <div className="title-wrapper d-flex justify-content-between">
                        <h1>Portfolio</h1>
                        <EditProfileButton
                            text="Add New"
                            showModal={true}
                            handleOnClick={() => {
                                setShowAddPortfolioModal(
                                    !showAddPortfolioModal
                                );
                                setIsEditProfile(false);
                            }}
                        />
                    </div>
                    <AddPortfolio
                        show={showAddPortfolioModal}
                        setShowAddPortfolioModal={setShowAddPortfolioModal}
                        handleClose={() => {
                            setShowAddPortfolioModal(false);
                            setIsEditProfile(false);
                        }}
                        id={id}
                        isEditProfile={isEditProfile}
                    />
                    <PortfolioDetails
                        show={showPortfolioDetails}
                        setShowPortfolioDetails={setShowPortfolioDetails}
                        handleClose={() => setShowPortfolioDetails(false)}
                        id={id}
                        handleDeletePortfolio={() => {
                            handleDelete(id, "portfolio");
                            setShowPortfolioDetails(false);
                        }}
                    />
                    <div className="content ">
                        {portfolioData?.data?.result
                            ? portfolioData?.data?.result?.map((info: any) => (
                                  <div
                                      className="data"
                                      key={info?.id}
                                      onMouseLeave={() => setHovered(null)}
                                      onMouseEnter={() => {
                                          setHovered(info?.id);
                                          setIsOnlyPortfolioText(false);
                                      }}
                                      onClick={() => setId(info?.id)}
                                  >
                                      <Row className="gx-5">
                                          <Col md={6} sm={12} xs={12}>
                                              {info?.images[0]?.media ? (
                                                  <figure
                                                      className="thumbnail-img"
                                                      onClick={() =>
                                                          setShowPortfolioDetails(
                                                              true
                                                          )
                                                      }
                                                  >
                                                      <Image
                                                          //   src={
                                                          //       info?.images[0]
                                                          //           ?.media ??
                                                          //       info?.images[1]
                                                          //           ?.media
                                                          //   }
                                                          src={
                                                              //info?.images ??
                                                              info?.images[0]?.name
                                                                  .substring(
                                                                      info.images[0]?.name.indexOf(
                                                                          "."
                                                                      ) + 1
                                                                  )
                                                                  .includes(
                                                                      "jpg"
                                                                  )
                                                                  ? info
                                                                        ?.images[0]
                                                                        ?.media
                                                                  : info
                                                                        ?.images[1]
                                                                        ?.media
                                                          }
                                                          layout="fill"
                                                          objectFit="cover"
                                                          alt="portfolio-image"
                                                      />
                                                  </figure>
                                              ) : (
                                                  ""
                                              )}
                                          </Col>
                                      </Row>

                                      {info?.images.length < 1 ? (
                                          <div
                                              className="portfolio-title"
                                              onMouseEnter={() => {
                                                  setIsOnlyPortfolioText(true);
                                                  setHovered(info?.id);
                                              }}
                                          >
                                              <p className="text-center">
                                                  {info.title}
                                              </p>
                                          </div>
                                      ) : (
                                          <div className="portfolio-title">
                                              <p
                                                  className={
                                                      isOnlyPortfolioText
                                                          ? "text-center text-pointer"
                                                          : "text-center"
                                                  }
                                                  onMouseEnter={() => {
                                                      setIsOnlyPortfolioText(
                                                          false
                                                      );
                                                  }}
                                              >
                                                  {info.title}
                                              </p>
                                          </div>
                                      )}
                                      {hovered === info.id ? (
                                          <div
                                              className={
                                                  isOnlyPortfolioText
                                                      ? "icon-down"
                                                      : "icons"
                                              }
                                          >
                                              <FontAwesomeIcon
                                                  icon={faPencil}
                                                  className={
                                                      isOnlyPortfolioText
                                                          ? "blak-icon"
                                                          : "svg-icon"
                                                  }
                                                  onClick={() => {
                                                      setShowAddPortfolioModal(
                                                          true
                                                      );
                                                      setId(info?.id);
                                                      setIsEditProfile(true);
                                                  }}
                                              />
                                              <FontAwesomeIcon
                                                  icon={faTrashCan}
                                                  className={
                                                      isOnlyPortfolioText
                                                          ? "trash black-icon"
                                                          : "trash svg-icon"
                                                  }
                                                  onClick={() => {
                                                      handleDelete(
                                                          info?.id,
                                                          "portfolio"
                                                      );
                                                      setIsEditProfile(false);
                                                  }}
                                              />
                                          </div>
                                      ) : (
                                          ""
                                      )}
                                  </div>
                              ))
                            : "Add your Portfolio."}
                    </div>
                </div>
                <div className="type experience">
                    <div className="title-wrapper d-flex justify-content-between">
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
                                {experienceData?.data?.result
                                    ? experienceData?.data?.result?.map(
                                          (value) => {
                                              return (
                                                  <div
                                                      className="experience__type"
                                                      key={value.id}
                                                      onMouseLeave={() =>
                                                          setExperienceHovered(
                                                              null
                                                          )
                                                      }
                                                      onMouseEnter={() =>
                                                          setExperienceHovered(
                                                              value?.id
                                                          )
                                                      }
                                                  >
                                                      <div className="name d-flex">
                                                          <h3>
                                                              {value?.title}
                                                          </h3>

                                                          {experienceHovered ===
                                                          value.id ? (
                                                              <div className="icons">
                                                                  <FontAwesomeIcon
                                                                      icon={
                                                                          faPencil
                                                                      }
                                                                      className="svg-icon"
                                                                      onClick={() =>
                                                                          handleEdit(
                                                                              value?.id
                                                                          )
                                                                      }
                                                                  />
                                                                  <FontAwesomeIcon
                                                                      icon={
                                                                          faTrashCan
                                                                      }
                                                                      className="trash svg-icon"
                                                                      onClick={() =>
                                                                          handleDelete(
                                                                              value?.id,
                                                                              "experience"
                                                                          )
                                                                      }
                                                                  />
                                                              </div>
                                                          ) : (
                                                              ""
                                                          )}
                                                      </div>
                                                      <div className="company d-flex">
                                                          <p className="name">
                                                              {
                                                                  value?.company_name
                                                              }
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
                                              );
                                          }
                                      )
                                    : "Add your Experience details."}
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
                                {userSkills
                                    ? userSkills.map((info: any, i: any) => (
                                          <div className="skills__type" key={i}>
                                              {info}
                                          </div>
                                      ))
                                    : "No skills to show. Please add them"}
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
                                {educationData?.data?.result
                                    ? educationData?.data.result.map(
                                          (value: any) => (
                                              <div
                                                  className="education__type"
                                                  key={value?.id}
                                                  onMouseLeave={() =>
                                                      setEducationHovered(null)
                                                  }
                                                  onMouseEnter={() =>
                                                      setEducationHovered(
                                                          value?.id
                                                      )
                                                  }
                                              >
                                                  <div className="name d-flex">
                                                      <h3 className="institution">
                                                          {value.school}
                                                      </h3>

                                                      {educationHovered ===
                                                      value.id ? (
                                                          <div className="icons">
                                                              <FontAwesomeIcon
                                                                  icon={
                                                                      faPencil
                                                                  }
                                                                  className="svg-icon"
                                                                  onClick={() => {
                                                                      setShowEducationForm(
                                                                          !showEducationForm
                                                                      );
                                                                      setId(
                                                                          value?.id
                                                                      );
                                                                  }}
                                                              />
                                                              <FontAwesomeIcon
                                                                  icon={
                                                                      faTrashCan
                                                                  }
                                                                  className="trash svg-icon"
                                                                  onClick={() =>
                                                                      handleDelete(
                                                                          value?.id,
                                                                          "education"
                                                                      )
                                                                  }
                                                              />
                                                          </div>
                                                      ) : (
                                                          ""
                                                      )}
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
                                    : "Add your Education details."}
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
                                {certificationData?.data?.result
                                    ? certificationData?.data.result?.map(
                                          (value) => (
                                              <div
                                                  className="certification__type"
                                                  key={value?.id}
                                              >
                                                  <div
                                                      className="name d-flex"
                                                      onMouseLeave={() =>
                                                          setCertificationHovered(
                                                              null
                                                          )
                                                      }
                                                      onMouseEnter={() =>
                                                          setCertificationHovered(
                                                              value?.id
                                                          )
                                                      }
                                                  >
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
                                                      {certificationHovered ===
                                                      value?.id ? (
                                                          <div className="icons">
                                                              <FontAwesomeIcon
                                                                  icon={
                                                                      faPencil
                                                                  }
                                                                  className="svg-icon"
                                                                  onClick={() => {
                                                                      setShowCertificationModal(
                                                                          !showCertificationModal
                                                                      );
                                                                      setId(
                                                                          value?.id
                                                                      );
                                                                  }}
                                                              />
                                                              <FontAwesomeIcon
                                                                  icon={
                                                                      faTrashCan
                                                                  }
                                                                  className="trash svg-icon"
                                                                  onClick={() =>
                                                                      handleDelete(
                                                                          value?.id,
                                                                          "certification"
                                                                      )
                                                                  }
                                                              />
                                                          </div>
                                                      ) : (
                                                          ""
                                                      )}
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
                                    : "Add your certificate details."}
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="reviews">
                    <div className="head-container">
                        <Row className="align-items-center">
                            <Col md={4}>
                                <h3>
                                    My Reviews{" "}
                                    <span>
                                        (
                                        {taskerRating &&
                                            taskerRating.data.result.length}
                                        )
                                    </span>{" "}
                                </h3>
                            </Col>
                            <Col md={{ span: 7, offset: 1 }}>
                                <Row className="select-field justify-content-end">
                                    <Col md={6}>
                                        <Formik
                                            initialValues={reviewSearchData}
                                            validationSchema={
                                                ReviewSearchSchema
                                            }
                                            onSubmit={async (values) => {
                                                console.log(values);
                                            }}
                                        >
                                            <Form
                                                onChange={(e: any) => {
                                                    setSearch(e.target.value);
                                                }}
                                            >
                                                <Form.Select
                                                    aria-label="Default select example"
                                                    className="dropdown-wrapper"
                                                >
                                                    <option value="-rating">
                                                        Most Relevant
                                                    </option>
                                                    <option value="-updated_at">
                                                        Latest
                                                    </option>
                                                    <option value="-rating">
                                                        Top
                                                    </option>
                                                </Form.Select>
                                            </Form>
                                        </Formik>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>

                    <div className="review-container">
                        <Row className="gx-5 type">
                            {taskerRating &&
                            taskerRating?.data.result.length > 0 ? (
                                <div>
                                    <Spoiler
                                        maxHeight={480}
                                        hideLabel={"Hide"}
                                        showLabel={"See all reviews"}
                                        className={"mb-5"}
                                    >
                                        {taskerRating?.data?.result?.map(
                                            (review) => (
                                                <Col md={8} key={review.id}>
                                                    <Reviews
                                                        name={
                                                            review?.rated_by
                                                                .full_name
                                                        }
                                                        raterEmail={
                                                            review?.rated_by
                                                                .email
                                                        }
                                                        ratings={review?.rating}
                                                        description={
                                                            review?.review
                                                        }
                                                        time={
                                                            review?.updated_at
                                                        }
                                                        raterId={
                                                            review?.rated_by.id
                                                        }
                                                        image={
                                                            review?.rated_by
                                                                .profile_image
                                                        }
                                                    />
                                                </Col>
                                            )
                                        )}
                                    </Spoiler>
                                </div>
                            ) : (
                                <div>
                                    <p>
                                        You have no reviews yet, Get started
                                        with task.
                                    </p>
                                    <a
                                        onClick={() =>
                                            toggleShowPostTaskModal()
                                        }
                                        className="nav-cta-btn"
                                        role="button"
                                    >
                                        Post a Task
                                    </a>
                                </div>
                            )}
                        </Row>
                    </div>
                </div>
                <DeleteModal
                    show={showDeleteModal}
                    setShowDeleteModal={setShowDeleteModal}
                    handleClose={() => setShowDeleteModal(false)}
                    id={id}
                    modalName={modalName}
                />
            </div>
        </>
    );
};
export default AboutProfile;
