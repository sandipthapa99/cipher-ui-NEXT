import { FilterReview } from "@components/common/FilterReview";
import Reviews from "@components/common/Reviews";
import { AddReviewForm } from "@components/Task/UserTaskDetail/atoms/AddReviewForm";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { reviewsContent } from "staticData/reviews";
import { axiosClient } from "utils/axiosClient";

export const UserTaskReviews = ({ activeTaskId }: { activeTaskId: string }) => {
    const { data: taskerRatingData } = useQuery(
        ["tasker-rating-data", activeTaskId],
        async () => {
            return await axiosClient.get(`/task/rating/list/${activeTaskId}`);
        }
    );

    console.log("tasker rating data", taskerRatingData?.data?.result);
    const ratingData = taskerRatingData?.data?.result;
    return (
        <>
            <FilterReview totalReviews={ratingData?.length} />
            <div className="review">
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
            </div>
            <Link href="/all-reviews">
                <a>See all reviews</a>
            </Link>
            <span className="td-divider"></span>
            <AddReviewForm />
        </>
    );
};
