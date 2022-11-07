import { FilterReview } from "@components/common/FilterReview";
import Reviews from "@components/common/Reviews";
import { AddReviewForm } from "@components/Task/UserTaskDetail/atoms/AddReviewForm";
import { faWarning } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, Highlight, Loader, Select, Spoiler } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { Formik } from "formik";
import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { axiosClient } from "utils/axiosClient";
export const UserTaskReviews = ({ activeTaskId }: { activeTaskId: string }) => {
    const [search, setSearch] = useState("-rating");
    const { data: taskerRatingData, isLoading: ratingLoading } = useQuery(
        ["tasker-rating-data", activeTaskId, search],
        async () => {
            return await axiosClient.get(
                `/task/rating/list/${activeTaskId}?ordering=${search}`
            );
        }
    );

    const [show, setShow] = useState<boolean>(true);

    const ratingData = taskerRatingData?.data?.result;
    return (
        <>
            {/* <FilterReview totalReviews={ratingData?.length} /> */}
            <Row className="align-items-center td-filter-review-container">
                <Col md={4}>
                    <div className="d-flex">
                        <h2 className="d-flex align-items-center mb-0">
                            Reviews
                            <span>({ratingData && ratingData.length})</span>
                        </h2>
                    </div>
                </Col>
                <Col md={{ span: 7, offset: 1 }}>
                    <Select
                        defaultValue={"Most_Relevant"}
                        size={"sm"}
                        className={"ms-auto w-50 text-secondary"}
                        data={[
                            { value: "Most_Relevant", label: "Most Relevant" },
                            { value: "latest", label: "Latest" },
                            { value: "top", label: "Top" },
                        ]}
                    />
                </Col>
            </Row>
            {!ratingData ||
                (ratingData.length <= 0 && (
                    <Alert
                        icon={<FontAwesomeIcon icon={faWarning} />}
                        title="No data Available!"
                        color="orange"
                        radius="md"
                        className="mt-5"
                        sx={{ minWidth: 100 }}
                    >
                        Product not reviewed yet
                    </Alert>
                ))}
            {ratingLoading ? (
                <Loader size="sm" />
            ) : ratingData.length > 0 ? (
                <div>
                    {ratingData
                        ?.slice(0, show ? ratingData?.length : 2)
                        .map((review: any, index: any) => (
                            <>
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
                                    image={review?.rated_by?.profile_image}
                                />
                            </>
                        ))}
                    <span
                        className="review-button"
                        role={"button"}
                        onClick={() => setShow(!show)}
                    >
                        {!show ? "See all reviews" : "Hide all reviews"}
                    </span>
                </div>
            ) : (
                ""
            )}

            {/* <span className="td-divider"></span> */}
        </>
    );
};

// const newData = {
//     media_type: "video",
//     placeholder: "new",
//     medias: newValue.image,
// };
// Object.entries(newData).forEach((entry) => {
//     const [key, value] = entry;
//

//     formData.append(key, value);
// });
//
// fileStore(formData, {
//     onSuccess: async () => {
//
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

// {ratingLoading ? (
//     <Loader size="sm" />
// ) : ratingData.length > 0 ? (
//     <div>
//         {ratingData
//             ?.slice(0, show ? ratingData?.length : 2)
//             .map((review: any, index: any) => (
//                 <>
//                     <Reviews
//                         repliedBy={`${review?.rated_to?.first_name} ${review?.rated_to?.last_name}`}
//                         repliedText={review.reply}
//                         replied={
//                             review.reply === null ? false : true
//                         }
//                         id={review?.id}
//                         name={`${review?.rated_by?.first_name} ${review?.rated_by?.last_name}`}
//                         key={index}
//                         raterEmail={review?.rated_by.email}
//                         ratings={review?.rating}
//                         description={review?.review}
//                         time={review?.updated_at}
//                         raterId={review?.rated_by.id}
//                         image={review?.rated_by?.profile_image}
//                     />
//                 </>
//             ))}
//         <span
//             className="review-button"
//             role={"button"}
//             onClick={() => setShow(!show)}
//         >
//             {!show ? "See all reviews" : "Hide all reviews"}
//         </span>
//     </div>
// ) : (
//     ""
// )}
