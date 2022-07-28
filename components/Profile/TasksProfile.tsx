import Reviews from "@components/common/Reviews";
import SelectInputField from "@components/common/SelectInputField";
import { faChevronDown } from "@fortawesome/pro-regular-svg-icons";
import { faStar } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import { profileTaskCard } from "staticData/profileTaskCard";
import { reviewsContent } from "staticData/reviews";
import HomeSearchSchema from "utils/formValidation/homeSearchValidation";
import { HomeSearchdata } from "utils/homeSearchData";
import { personType, reviewType } from "utils/options";

const TasksProfileCard = () => {
    return (
        <section className="profile-task">
            <section className="profile-task__top-container">
                <Row>
                    {profileTaskCard &&
                        profileTaskCard.map((info) => (
                            <Col lg={3} md={4} key={info.id}>
                                <div className="about-card-block">
                                    <figure className="thumbnail-img">
                                        <Image
                                            src={info.cardImage}
                                            layout="fill"
                                            objectFit="cover"
                                            alt="about-card-image"
                                        />
                                    </figure>
                                    <div className="card-content">
                                        <h2 className="card-title">
                                            {info.title}
                                        </h2>

                                        <p className="address">
                                            {info.address}
                                        </p>
                                        <p className="description">
                                            {/* {`${cardDescription.substring(0, 80)}...`} */}
                                            {info.description}
                                        </p>

                                        <div className="bottom d-flex justify-content-between">
                                            <div className="rating d-flex align-items-center">
                                                <FontAwesomeIcon
                                                    icon={faStar}
                                                    className="svg-icon"
                                                />
                                                <p className="value">
                                                    {info.rating}
                                                </p>
                                            </div>
                                            <p className="price">
                                                ${info.price}/hr
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))}
                </Row>
            </section>

            <section className="profile-task__bottom-container">
                <div className="reviews">
                    <div className="head-container">
                        <h3>
                            My Reviews <span>(3,003)</span>{" "}
                        </h3>
                        <div className="dropdowns">
                            <Formik
                                initialValues={HomeSearchdata}
                                validationSchema={HomeSearchSchema}
                                onSubmit={async (values) => {
                                    console.log(values);
                                }}
                            >
                                <div className="dropdown-wrapper review-type">
                                    <div className="dropdown">
                                        <SelectInputField
                                            name="review"
                                            options={personType}
                                            fieldRequired
                                            defaultValue="Tasker"
                                        />
                                        <FontAwesomeIcon
                                            icon={faChevronDown}
                                            className="svg-icon"
                                        />
                                    </div>
                                </div>
                            </Formik>

                            <Formik
                                initialValues={HomeSearchdata}
                                validationSchema={HomeSearchSchema}
                                onSubmit={async (values) => {
                                    console.log(values);
                                }}
                            >
                                <div className="dropdown-wrapper relevancy">
                                    <div className="dropdown">
                                        <SelectInputField
                                            name="review"
                                            options={reviewType}
                                            placeholder="Most Relevant"
                                            fieldRequired
                                        />
                                        <FontAwesomeIcon
                                            icon={faChevronDown}
                                            className="svg-icon"
                                        />
                                    </div>
                                </div>
                            </Formik>
                        </div>
                    </div>
                    <div className="review-container">
                        {reviewsContent &&
                            reviewsContent.map((review) => (
                                <Row key={review.id}>
                                    <Col md={8}>
                                        <Reviews
                                            name={review.name}
                                            ratings={review.ratings}
                                            description={review.description}
                                            time={review.time}
                                            image={review.image}
                                        />
                                    </Col>
                                </Row>
                            ))}
                        <Link href="/">See all reviews</Link>
                    </div>
                </div>
            </section>
        </section>
    );
};
export default TasksProfileCard;
