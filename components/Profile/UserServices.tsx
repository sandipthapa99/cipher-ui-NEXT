import Reviews from "@components/common/Reviews";
import ServiceCard from "@components/common/ServiceCard";
import { faAnalytics } from "@fortawesome/pro-regular-svg-icons";
import { Spoiler } from "@mantine/core";
import { Formik } from "formik";
import { useGetProfile } from "hooks/profile/useGetProfile";
import type { RatingResponse } from "hooks/rating/getRating";
import { useData } from "hooks/use-data";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useToggleShowPostTaskModal } from "store/use-show-post-task";
import type { ServicesValueProps } from "types/serviceCard";
import { reviewSearchData } from "utils/formData";
import ReviewSearchSchema from "utils/formValidation/reviewSearchSchema";
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
    const [search, setSearch] = useState("-rating");

    const toggleShowPostTaskModal = useToggleShowPostTaskModal();
    const { data: servicesData } = useData<ServicesValueProps>(
        ["all-services"],
        "/task/service/"
    );

    const { data: profileDetails } = useGetProfile();
    const userId = profileDetails?.user.id;
    const taskerServices = servicesData?.data.result.filter(
        (services) => services.created_by.id === userId
    );

    const { data: taskerRating } = useData<RatingResponse>(
        ["tasker-rating", search],
        `/task/rating?ordering=${search}`
    );

    return (
        <section className="profile-task">
            <div className="profile-task__top-container">
                <Row className="gx-5">
                    {taskerServices && taskerServices?.length > 0 ? (
                        taskerServices?.map((service, key) => {
                            return (
                                <Col
                                    sm={6}
                                    md={4}
                                    lg={3}
                                    key={key}
                                    className="d-flex"
                                >
                                    <ServiceCard serviceCard={service} />
                                </Col>
                            );
                        })
                    ) : (
                        <div>
                            <p>
                                You have not posted any services right now. Add
                                services.
                            </p>
                            <a
                                onClick={() => toggleShowPostTaskModal()}
                                className="nav-cta-btn"
                                role="button"
                            >
                                Post a Service
                            </a>
                        </div>
                    )}
                </Row>
            </div>
            {/* task reviews */}
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
                                        validationSchema={ReviewSearchSchema}
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
                                                        review?.rated_by.email
                                                    }
                                                    ratings={review?.rating}
                                                    description={review?.review}
                                                    time={review?.updated_at}
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
                                    You have no reviews yet, Get started with
                                    task.
                                </p>
                                <a
                                    onClick={() => toggleShowPostTaskModal()}
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
            {/* <div className="profile-task__bottom-container reviews">
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
            </div> */}
        </section>
    );
};
export default TasksProfileCard;
