import Reviews from "@components/common/Reviews";
import { AddReviewForm } from "@components/Task/UserTaskDetail/atoms/AddReviewForm";
import { useQuery } from "@tanstack/react-query";
import { Formik } from "formik";
import Link from "next/link";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { axiosClient } from "utils/axiosClient";
import { reviewSearchData } from "utils/formData";
import ReviewSearchSchema from "utils/formValidation/reviewSearchSchema";
export const UserTaskReviews = ({ activeTaskId }: { activeTaskId: string }) => {
    const { data: taskerRatingData } = useQuery(
        ["tasker-rating-data", activeTaskId],
        async () => {
            return await axiosClient.get(
                `/task/rating/list/${activeTaskId}?ordering=${search}`
            );
        }
    );
    const [search, setSearch] = useState("-rating");

    const ratingData = taskerRatingData?.data?.result;
    return (
        // <>
        //     {/* <FilterReview totalReviews={ratingData?.length} /> */}
        //     <Formik
        //         initialValues={reviewSearchData}
        //         validationSchema={ReviewSearchSchema}
        //         onSubmit={async (values) => {
        //             console.log(values);
        //         }}
        //     >
        //         {({ isSubmitting, errors, values, touched }) => (
        //             <Form
        //                 onChange={(e: any) => {
        //                     setSearch(e.target.value);
        //                 }}
        //             >
        //                 <Form.Select
        //                     aria-label="Default select example"
        //                     className="dropdown-wrapper"
        //                 >
        //                     <option value="-rating">Most Relevant</option>
        //                     <option value="-updated_at">Latest</option>
        //                     <option value="-rating">Top</option>
        //                 </Form.Select>
        //             </Form>
        //         )}
        //     </Formik>
        //     <div className="review">
        //         {ratingData?.map((review: any, index: any) => (
        //             <Reviews
        //                 key={index}
        //                 name={review?.rated_by.full_name}
        //                 raterEmail={review?.rated_by.email}
        //                 ratings={review?.rating}
        //                 description={review?.review}
        //                 time={review?.updated_at}
        //                 raterId={review?.rated_by.id}
        //                 image={review?.rated_by?.profile_image}
        //             />
        //         ))}
        //     </div>
        //     <Link href="/all-reviews">
        //         <a>See all reviews</a>
        //     </Link>
        //     <span className="td-divider"></span>
        //     {/* <AddReviewForm /> */}
        // </>
        <div className="reviews">
            <div className="head-container">
                <Row className="align-items-center">
                    <Col md={3}>
                        <h3>
                            Reviews{" "}
                            <span>({ratingData && ratingData?.length})</span>{" "}
                        </h3>
                    </Col>
                    <Col md={{ span: 9, offset: 0 }}>
                        <Row className="select-field justify-content-end">
                            <Col md={6}>
                                <Formik
                                    initialValues={reviewSearchData}
                                    validationSchema={ReviewSearchSchema}
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
                                    )}
                                </Formik>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>

            <div className="review-container">
                <Row className="gx-5 type">
                    {ratingData?.map((review: any, index: any) => (
                        <Reviews
                            key={index}
                            name={review?.rated_by.full_name}
                            raterEmail={review?.rated_by.email}
                            ratings={review?.rating}
                            description={review?.review}
                            time={review?.updated_at}
                            raterId={review?.rated_by.id}
                            image={review?.rated_by?.profile_image}
                        />
                    ))}

                    <Link href="#!">
                        {/* onClick={() => setPage(page + 1)} */}
                        See all reviews
                    </Link>
                </Row>
            </div>
            <AddReviewForm />
        </div>
    );
};

// const newData = {
//     media_type: "video",
//     placeholder: "new",
//     medias: newValue.image,
// };
// Object.entries(newData).forEach((entry) => {
//     const [key, value] = entry;
//     console.log("entry=", entry, key, value);

//     formData.append(key, value);
// });
// console.log("submitted values new", formData);
// fileStore(formData, {
//     onSuccess: async () => {
//         console.log(
//             "submitted values new",
//             formData
//         );

//         // queryClient.invalidateQueries([
//         //     "tasker-portfolio",
//         // ]);
//         toast.success(
//             "Portfolio added successfully."
//         );
//     },
//     onError: async (error) => {
//         toast.error(error.message);
//     },
// });
