import Reviews from "@components/common/Reviews";
import { faWarning } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, Grid, Select, Skeleton } from "@mantine/core";
import urls from "constants/urls";
import { useData } from "hooks/use-data";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import type { RatingResponse } from "types/ratingProps";

export const UserTaskReviews = ({ activeTaskId }: { activeTaskId: string }) => {
    const [search, setSearch] = useState("-rating");
    // const { data: taskerRatingData, isLoading: ratingLoading } = useQuery(
    //     ["tasker-rating-data", activeTaskId, search],
    //     async () => {
    //         return await axiosClient.get(
    //             `/task/rating/list/${activeTaskId}?ordering=${search}`
    //         );
    //     }
    // );
    const taskerId = activeTaskId;

    const { data: taskerRatingData, isLoading: ratingLoading } =
        useData<RatingResponse>(
            ["tasker-rating", search],
            `${urls.profile.rating}/list/${taskerId}?ordering=${search}`
        );
    console.log(
        "🚀 ~ file: UserTaskReviews.tsx:23 ~ UserTaskReviews ~ taskerRatingData",
        taskerRatingData
    );
    const [show, setShow] = useState<boolean>(false);

    const ratingData = taskerRatingData?.data?.result;

    return (
        <>
            {/* <FilterReview totalReviews={ratingData?.length} /> */}
            <Row className="align-items-center td-filter-review-container">
                <Col md={4}>
                    <div className="d-flex">
                        <h2 className="d-flex align-items-center mb-0">
                            Reviews
                            <span>
                                (
                                {ratingData?.length !== 0
                                    ? ratingData?.length
                                    : 0}
                                )
                            </span>
                        </h2>
                    </div>
                </Col>
                <Col md={{ span: 7, offset: 1 }}>
                    <Select
                        defaultValue={"-rating"}
                        size={"sm"}
                        className={"ms-auto w-50 text-secondary"}
                        data={[
                            { value: "-rating", label: "Most Relevant" },
                            { value: "-updated_at", label: "Latest" },
                            { value: "rating", label: "Top" },
                        ]}
                        onChange={(value: any) => {
                            setSearch(value);
                        }}
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
                <Grid className="mt-3">
                    <Grid.Col span={2}>
                        <Skeleton height={80} circle mb="xl" />
                    </Grid.Col>
                    <Grid.Col span={8}>
                        <Skeleton height={20} width={"100%"} radius="sm" />
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
                ratingData
                    ?.slice(0, show ? ratingData?.length : 2)
                    .map((review: any, index: any) => (
                        <Reviews
                            repliedBy={`${review?.rated_to?.first_name} ${review?.rated_to?.last_name}`}
                            repliedText={review.reply}
                            replied={review.reply === null ? false : true}
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
                                    ? review?.rated_by?.profile_image
                                    : review?.rated_by?.avatar?.image
                            }
                            ratedToImage={
                                review?.rated_to?.profile_image
                                    ? review?.rated_to?.profile_image
                                    : review?.rated_to?.avatar?.image
                            }
                            ratedToId={review.rated_to.id}
                            repliedDate={review.updated_at}
                        />
                    ))
            )}
            {ratingData && ratingData?.length > 2 ? (
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
            {/* 
            <span className="td-divider"></span>
            <div className="ratings">
                <AddReviewForm />
            </div> */}
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
