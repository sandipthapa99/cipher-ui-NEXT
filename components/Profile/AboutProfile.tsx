import DeleteModal from "@components/common/DeleteModal";
import Reviews from "@components/common/Reviews";
import SelectInputField from "@components/common/SelectInputField";
import { faPencil, faTrashCan } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Formik } from "formik";
import { useGetProfile } from "hooks/profile/useGetProfile";
import type { RatingResponse } from "hooks/rating/getRating";
import { useGetTaskerRating } from "hooks/rating/getRating";
import { useSearchRating } from "hooks/rating/getSearchedRating";
import { useData } from "hooks/use-data";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import type { UserProfileProps } from "types/userProfileProps";
import { reviewSearchData } from "utils/formData";
import ReviewSearchSchema from "utils/formValidation/reviewSearchSchema";
import { isSubmittingClass } from "utils/helpers";
import { reviewType } from "utils/options";

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
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [modalName, setModalName] = useState("");
    const [id, setId] = useState<number | undefined>();
    const [search, setSearch] = useState<string | undefined>("-rating");

    // const [uuid, setUUID] = useState<number | undefined>();
    //tasker rating data
    //   const { data: taskerRating, error } = useGetTaskerRating();
    const queryClient = useQueryClient();
    // user profile certification data
    const { data: taskerRating } = useData<RatingResponse>(
        ["tasker-rating"],
        "/task/rating/"
    );
    const { mutate: searchMutation, data: filteredData } =
        useSearchRating<RatingResponse>(`/task/rating/?ordering=${search}`);
    console.log("filterd reviw", filteredData?.result);

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

    const handleDelete = useCallback((id: any, name: string) => {
        setShowDeleteModal(!showDeleteModal);
        setId(id);
        setModalName(name);
    }, []);

    const { data: profileDetails } = useGetProfile();

    const userSkills = profileDetails ? JSON.parse(profileDetails?.skill) : [];

    const [hovered, setHovered] = useState<null | number>(null);

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
                                          (value) => {
                                              return (
                                                  <div
                                                      className="experience__type"
                                                      key={value.id}
                                                      onMouseLeave={() =>
                                                          setHovered(null)
                                                      }
                                                      onMouseEnter={() =>
                                                          setHovered(value?.id)
                                                      }
                                                  >
                                                      <div className="name d-flex">
                                                          <h3>
                                                              {value?.title}
                                                          </h3>

                                                          {hovered ===
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
                    {/* 
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
                    </Row> */}
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
                                          (value: any) => (
                                              <div
                                                  className="education__type"
                                                  key={value?.id}
                                                  onMouseLeave={() =>
                                                      setHovered(null)
                                                  }
                                                  onMouseEnter={() =>
                                                      setHovered(value?.id)
                                                  }
                                              >
                                                  <div className="name d-flex">
                                                      <h3 className="institution">
                                                          {value.school}
                                                      </h3>

                                                      {hovered === value.id ? (
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
                                          (value) => (
                                              <div
                                                  className="certification__type"
                                                  key={value?.id}
                                              >
                                                  <div
                                                      className="name d-flex"
                                                      onMouseLeave={() =>
                                                          setHovered(null)
                                                      }
                                                      onMouseEnter={() =>
                                                          setHovered(value?.id)
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
                                                      {hovered === value?.id ? (
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
                                    : "Looks like you have no certificates"}
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="reviews">
                    <div className="head-container">
                        <Row className="align-items-center">
                            <Col md={6}>
                                <h3>
                                    My Reviews <span>(3,0003)</span>{" "}
                                </h3>
                            </Col>
                            <Col md={6}>
                                <Row className="select-field">
                                    {/* <Col md={6}>
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
                                                type="submit"
                                                placeHolder="Tasker"
                                                // onChange={(e: any) => {
                                                //     {
                                                //         setOrder(
                                                //             e?.target?.value
                                                //         );
                                                //         searchMutation(order, {
                                                //             onSuccess:
                                                //                 async () => {
                                                //                     console.log(
                                                //                         "submitted values",
                                                //                         order
                                                //                     );

                                                //                     queryClient.invalidateQueries(
                                                //                         [
                                                //                             "tasker-rating",
                                                //                         ]
                                                //                     );
                                                //                 },
                                                //             onError: async (
                                                //                 error
                                                //             ) => {
                                                //                 console.log(
                                                //                     "error=",
                                                //                     error
                                                //                 );
                                                //             },
                                                //         });
                                                //     }
                                                // }}
                                            />
                                        </Formik>
                                    </Col> */}
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
                                            {({
                                                isSubmitting,
                                                errors,
                                                values,
                                                touched,
                                            }) => (
                                                <Form
                                                    onChange={(e: any) => {
                                                        setSearch(
                                                            e.target.value
                                                        );
                                                        console.log(
                                                            "values0,",
                                                            e.target.value
                                                        );
                                                        searchMutation(search, {
                                                            onSuccess:
                                                                async () => {
                                                                    console.log(
                                                                        "submitted values",
                                                                        search
                                                                    );

                                                                    queryClient.invalidateQueries(
                                                                        [
                                                                            "tasker-rating",
                                                                        ]
                                                                    );
                                                                },
                                                            onError: async (
                                                                error
                                                            ) => {
                                                                // console.log(
                                                                //     "error=",
                                                                //     error
                                                                // );
                                                            },
                                                        });
                                                    }}
                                                >
                                                    <Form.Select aria-label="Default select example">
                                                        <option value="-updated_at">
                                                            Most Relevant
                                                        </option>
                                                        <option value="-updated_at">
                                                            Latest
                                                        </option>
                                                        <option value="-rating">
                                                            Top
                                                        </option>
                                                    </Form.Select>
                                                    {/* <SelectInputField
                                                        name="search_value"
                                                        options={reviewType}
                                                        fieldRequired
                                                        placeHolder="Most Relevant"
                                                        // value={
                                                        //     values.search_category
                                                        // }
                                                        onChange={(e: any) => {
                                                            setSearch(
                                                                values.search_value
                                                            );
                                                            console.log(
                                                                "values0,",
                                                                values.search_value
                                                            );
                                                            searchMutation(
                                                                search,
                                                                {
                                                                    onSuccess:
                                                                        async () => {
                                                                            console.log(
                                                                                "submitted values",
                                                                                search
                                                                            );

                                                                            queryClient.invalidateQueries(
                                                                                [
                                                                                    "tasker-rating",
                                                                                ]
                                                                            );
                                                                        },
                                                                    onError:
                                                                        async (
                                                                            error
                                                                        ) => {
                                                                            // console.log(
                                                                            //     "error=",
                                                                            //     error
                                                                            // );
                                                                        },
                                                                }
                                                            );
                                                        }}
                                                    /> */}
                                                </Form>
                                            )}
                                        </Formik>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>

                    <div className="review-container">
                        <Row className="gx-5 type">
                            {filteredData
                                ? filteredData &&
                                  filteredData?.result?.map((review) => (
                                      <Col md={8} key={review.id}>
                                          <Reviews
                                              name={review.rated_by.full_name}
                                              raterEmail={review.rated_by.email}
                                              ratings={review.rating}
                                              description={review.review}
                                              time={review.updated_at}
                                              raterId={review.rated_by.id}

                                              // image={review.image}
                                          />
                                      </Col>
                                  ))
                                : taskerRating &&
                                  taskerRating?.data?.result?.map((review) => (
                                      <Col md={8} key={review.id}>
                                          <Reviews
                                              name={review.rated_by.full_name}
                                              raterEmail={review.rated_by.email}
                                              ratings={review.rating}
                                              description={review.review}
                                              time={review.updated_at}
                                              raterId={review.rated_by.id}

                                              // image={review.image}
                                          />
                                      </Col>
                                  ))}

                            <Link href="#!">See all reviews</Link>
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
