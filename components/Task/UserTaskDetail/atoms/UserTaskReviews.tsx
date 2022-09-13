import { FilterReview } from "@components/common/FilterReview";
import Reviews from "@components/common/Reviews";
import { AddReviewForm } from "@components/Task/UserTaskDetail/atoms/AddReviewForm";
import { Spoiler } from "@mantine/core";
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
            <Spoiler
                maxHeight={350}
                hideLabel={"Hide all reviews"}
                showLabel={"See all reviews"}
                className={"mb-5"}
            >
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
            </Spoiler>
            <span className="td-divider"></span>
            <AddReviewForm />
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
