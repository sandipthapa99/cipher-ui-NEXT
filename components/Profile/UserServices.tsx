import Reviews from "@components/common/Reviews";
import ServiceCard from "@components/common/ServiceCard";
import { Alert, Grid, Select, Skeleton } from "@mantine/core";
import urls from "constants/urls";
import { Formik } from "formik";
import { useUser } from "hooks/auth/useUser";
import { useGetProfile } from "hooks/profile/useGetProfile";
import { useData } from "hooks/use-data";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useToggleShowPostTaskModal } from "store/use-show-post-task";
import type { RatingResponse } from "types/ratingProps";
import type { ServicesValueProps } from "types/serviceCard";

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
        `${urls.task.service}`
    );
    const [show, setShow] = useState<boolean>(false);

    const { data: profileDetails } = useGetProfile();
    const userId = profileDetails?.user.id;
    const taskerServices = servicesData?.data.result.filter(
        (services) => services.created_by.id === userId
    );

    const { data: taskerRating, isLoading: ratingLoading } =
        useData<RatingResponse>(
            ["tasker-rating", search],
            `/task/rating?ordering=${search}`
        );

    const { data: user } = useUser();
    return (
        <section className="profile-task">
            <div className="profile-task__top-container">
                <Row className="gx-5">
                    {taskerServices && taskerServices?.length > 0 ? (
                        taskerServices?.map((service, key) => {
                            return (
                                <Col
                                    sm={6}
                                    md={6}
                                    lg={4}
                                    xl={3}
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
                                    Your KYC verification is pending. You can
                                    post a task once it is verified.{" "}
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
                                    }
                                    repliedDate={review.updated_at}
                                    ratedToImage={review.rated_to.profile_image}
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
        </section>
    );
};
export default TasksProfileCard;
