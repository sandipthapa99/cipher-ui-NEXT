import { FilterReview } from "@components/common/FilterReview";
import Reviews from "@components/common/Reviews";
import { AddReviewForm } from "@components/Task/UserTaskDetail/atoms/AddReviewForm";
import Link from "next/link";
import { reviewsContent } from "staticData/reviews";

export const UserTaskReviews = () => {
    return (
        <>
            <FilterReview totalReviews={reviewsContent.length} />
            <div>
                {reviewsContent.map((reviewContent, index) => (
                    <Reviews key={index} {...reviewContent} />
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
