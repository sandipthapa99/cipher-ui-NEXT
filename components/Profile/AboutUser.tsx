import DeleteModal from "@components/common/DeleteModal";
import Reviews from "@components/common/Reviews";
import { faPencil, faTrashCan } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, Grid, Select, Skeleton } from "@mantine/core";
import urls from "constants/urls";
import { format } from "date-fns";
import { useUser } from "hooks/auth/useUser";
import { useGetProfile } from "hooks/profile/useGetProfile";
import { useData } from "hooks/use-data";
import parse from "html-react-parser";
import Image from "next/image";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useToggleShowPostTaskModal } from "store/use-show-post-task";
import type { RatingResponse } from "types/ratingProps";
import type { UserProfileProps } from "types/userProfileProps";

import AddInterests from "./AddInterests";
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
    const [showInterestForm, setShowAddInterestsForm] = useState(false);

    const [showCertificationModal, setShowCertificationModal] = useState(false);
    const [showEducationForm, setShowEducationForm] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showPortfolioDetails, setShowPortfolioDetails] = useState(false);
    const [modalName, setModalName] = useState("");
    const [id, setId] = useState<number | undefined>();
    const [search, setSearch] = useState("-rating");
    const [isEditProfile, setIsEditProfile] = useState(false);
    const [isEditExperience, setIsEditExperience] = useState(false);
    // const [isEditExperience, setIsEditExperience] = useState(false);

    const [isOnlyPortfolioText, setIsOnlyPortfolioText] = useState(false);
    const toggleShowPostTaskModal = useToggleShowPostTaskModal();
    const { data: user } = useUser();
    const { data: taskerRating, isLoading: ratingLoading } =
        useData<RatingResponse>(
            ["tasker-rating", search],
            `${urls.profile.rating}?ordering=${search}`
        );

    // const { mutate: searchMutation, data: filteredData } =
    //     useSearchRating<RatingResponse>(`/task/rating/?ordering=${search}`);
    //
    const [show, setShow] = useState<boolean>(false);

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
    // const userInterest = profileDetails
    //     ? JSON.parse(profileDetails?.interests)
    //     : [];
    const userInterest = profileDetails?.interests
        ? profileDetails.interests.map((interest) => {
              return interest.name;
          })
        : [];

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
                                                          placeholder="blur"
                                                          blurDataURL="UYH+xQ}9r?xFs;jZf6j@RkkBoejajIoej[ja"
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
                                              onClick={() =>
                                                  setShowPortfolioDetails(true)
                                              }
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
                            handleOnClick={() => {
                                setShowExpForm(!showExpForm);
                                setIsEditExperience(false);
                            }}
                        />
                        <ExperienceForm
                            show={showExpForm}
                            setShowExpForm={setShowExpForm}
                            handleClose={() => {
                                setShowExpForm(false);
                                setIsEditExperience(false);
                            }}
                            id={id}
                            isEditExperience={isEditExperience}
                        />
                    </div>

                    <Row>
                        <Col md={9}>
                            <div className="content">
                                {experienceData?.data?.result
                                    ? experienceData?.data?.result?.map(
                                          (value: any) => {
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
                                                                      onClick={() => {
                                                                          handleEdit(
                                                                              value?.id
                                                                          );
                                                                          setIsEditExperience(
                                                                              true
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
                                                          {value?.description
                                                              ? parse(
                                                                    value.description
                                                                )
                                                              : ""}
                                                      </p>
                                                      {/* <p className="date">
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
                                                      </p> */}
                                                      <p className="date">
                                                          {format(
                                                              new Date(
                                                                  value?.start_date
                                                              ),
                                                              "MMMM yyyy"
                                                          )}
                                                          {`${
                                                              !value?.currently_working
                                                                  ? `- ${
                                                                        value?.end_date &&
                                                                        format(
                                                                            new Date(
                                                                                value.end_date
                                                                            ),
                                                                            "MMMM yyyy"
                                                                        )
                                                                    }`
                                                                  : "- Present"
                                                          }`}
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

                {/* User Interests */}
                <div className="type skills">
                    <div className="title-wrapper d-flex justify-content-between">
                        {/* <h2 className="heading-title">Community activity</h2> */}
                        <h1>Interests</h1>
                        <EditProfileButton
                            text="Add New"
                            showModal={true}
                            handleOnClick={() =>
                                setShowAddInterestsForm(!showInterestForm)
                            }
                        />
                        <AddInterests
                            show={showInterestForm}
                            setShowAddInterestsForm={setShowAddInterestsForm}
                            handleClose={() => setShowAddInterestsForm(false)}
                        />
                    </div>

                    <Row>
                        <Col md={9}>
                            <div className="content">
                                {userInterest
                                    ? userInterest.map((info: any, i: any) => (
                                          <div className="skills__type" key={i}>
                                              {info}
                                          </div>
                                      ))
                                    : "No interest to show. Please add them."}
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
                            handleOnClick={() => {
                                setShowEducationForm(!showEducationForm);
                                setIsEditProfile(false);
                            }}
                        />
                        <EducationForm
                            show={showEducationForm}
                            setShowEducationForm={setShowEducationForm}
                            handleClose={() => setShowEducationForm(false)}
                            id={id}
                            isEditProfile={isEditProfile}
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
                                                                      setIsEditProfile(
                                                                          true
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
                            handleOnClick={() => {
                                setShowCertificationModal(
                                    !showCertificationModal
                                );
                                setIsEditProfile(false);
                            }}
                        />
                        <CertificationForm
                            show={showCertificationModal}
                            setShowCertificationModal={
                                setShowCertificationModal
                            }
                            handleClose={() => setShowCertificationModal(false)}
                            id={id}
                            isEditProfile={isEditProfile}
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
                                                                      setIsEditProfile(
                                                                          true
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
                                                      {value?.description
                                                          ? parse(
                                                                value.description
                                                            )
                                                          : ""}
                                                  </h3>
                                                  <p className="date">
                                                      {format(
                                                          new Date(
                                                              value?.issued_date
                                                          ),
                                                          "MMMM yyyy"
                                                      )}
                                                      {`${
                                                          value?.does_expire ===
                                                          false
                                                              ? `- ${
                                                                    value?.expire_date &&
                                                                    format(
                                                                        new Date(
                                                                            value.expire_date
                                                                        ),
                                                                        "MMMM yyyy"
                                                                    )
                                                                }`
                                                              : "- Present"
                                                      }`}
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
                                <Select
                                    defaultValue={"-rating"}
                                    size={"sm"}
                                    className={"ms-auto w-50 text-secondary"}
                                    data={[
                                        {
                                            value: "-rating",
                                            label: "Most Relevant",
                                        },
                                        {
                                            value: "-updated_at",
                                            label: "Latest",
                                        },
                                        { value: "-rating", label: "Top" },
                                    ]}
                                    onChange={(value: any) => {
                                        setSearch(value);
                                    }}
                                />
                            </Col>
                        </Row>
                    </div>

                    <div className="review-container">
                        {!taskerRating?.data.result ||
                            (taskerRating?.data.result.length <= 0 &&
                                (user?.is_kyc_verified ? (
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
                                ) : (
                                    <Alert>
                                        Your KYC verification is pending. You
                                        can post a task once it is verified.{" "}
                                    </Alert>
                                )))}

                        {ratingLoading ? (
                            <Grid className="mt-3">
                                <Grid.Col span={2}>
                                    <Skeleton height={80} circle mb="xl" />
                                </Grid.Col>
                                <Grid.Col span={8}>
                                    <Skeleton
                                        height={20}
                                        width={"100%"}
                                        radius="sm"
                                    />
                                    <Skeleton height={15} mt={6} radius="sm" />
                                    <Skeleton
                                        className="mt-3"
                                        height={8}
                                        mt={6}
                                        width="40%"
                                        radius="xl"
                                    />
                                    <Skeleton
                                        className="mt-4"
                                        height={8}
                                        mt={6}
                                        width="20%"
                                        radius="xl"
                                    />
                                </Grid.Col>
                            </Grid>
                        ) : (
                            taskerRating?.data.result
                                ?.slice(
                                    0,
                                    show ? taskerRating?.data.result?.length : 2
                                )
                                .map((review: any, index: any) => (
                                    <Reviews
                                        repliedBy={`${review?.rated_to?.first_name} ${review?.rated_to?.last_name}`}
                                        repliedText={review.reply}
                                        replied={
                                            review.reply === null ? false : true
                                        }
                                        id={review?.id}
                                        name={`${review?.rated_by?.first_name} ${review?.rated_by?.last_name}`}
                                        key={index}
                                        raterEmail={review?.rated_by.email}
                                        ratings={review?.rating}
                                        description={review?.review}
                                        time={review?.updated_at}
                                        raterId={review?.rated_by.id}
                                        ratedByImage={
                                            review?.rated_by?.profile_image
                                                ? review?.rated_by
                                                      ?.profile_image
                                                : review?.rated_by?.avatar
                                                      ?.image
                                        }
                                        ratedToImage={
                                            review?.rated_to?.profile_image
                                                ? review?.rated_to
                                                      ?.profile_image
                                                : review?.rated_to?.avatar
                                                      ?.image
                                        }
                                        ratedToId={review.rated_to.id}
                                        repliedDate={review.updated_at}
                                    />
                                ))
                        )}
                        {taskerRating?.data.result &&
                        taskerRating?.data.result.length > 2 ? (
                            <span
                                className="review-button"
                                role={"button"}
                                onClick={() => setShow(!show)}
                            >
                                {!show ? "See all reviews" : "Hide reviews"}
                            </span>
                        ) : (
                            ""
                        )}
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

{
    /* <Col md={{ span: 7, offset: 1 }}>
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
                            </Col> */
}
