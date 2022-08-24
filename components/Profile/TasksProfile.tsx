import Reviews from "@components/common/Reviews";
import SelectInputField from "@components/common/SelectInputField";
import { faStar } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik } from "formik";
import { useData } from "hooks/use-data";
import Image from "next/image";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import { profileTaskCard } from "staticData/profileTaskCard";
import { reviewsContent } from "staticData/reviews";
import HomeSearchSchema from "utils/formValidation/homeSearchValidation";
import { HomeSearchdata } from "utils/homeSearchData";
import { personType, reviewType } from "utils/options";

export interface TaskerTasksProps {
    total_pages: number;
    count: number;
    current: number;
    next: any;
    previous: any;
    page_size: number;
    result: TaskResult[];
}

export interface TaskResult {
    id: string;
    category: Category;
    city: any;
    assigner: Assigner;
    currency: any;
    no_of_applicants: number;
    created_at: string;
    updated_at: string;
    deleted_at: any;
    title: string;
    description: string;
    charge: any;
    requirements: string;
    status: string;
    no_of_revisions: any;
    location: string;
    start_date: string;
    start_time: string;
    end_date: string;
    end_time: string;
    estimated_time: number;
    budget_type: string;
    budget_from: number;
    budget_to: any;
    no_of_revision_done: any;
    image: any;
    video: any;
    is_onsite: boolean;
    slug: string;
    is_recursion: boolean;
    is_everyday: boolean;
    no_of_recursion: number;
    meta_title: any;
    meta_description: string;
    meta_keyword: any;
    task_draft: any;
    service: any;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    icon: any;
}

export interface Assigner {
    id: string;
    email: string;
    full_name: string;
    profile_image: string;
}

const TasksProfileCard = () => {
    const { data: taskData } = useData<TaskerTasksProps>(
        ["tasker-tasks"],
        "/task/my-task/"
    );
    console.log("taksers tasks=", taskData);

    return (
        <section className="profile-task">
            <div className="profile-task__top-container">
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
            </div>

            {/* <div className="profile-task__bottom-container">
                <div className="reviews">
                    <Row className="head-container">
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
            </div> */}
            <div className="profile-task__bottom-container reviews">
                <div className="head-container">
                    <Row className="align-items-center">
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
                </div>

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
        </section>
    );
};
export default TasksProfileCard;
