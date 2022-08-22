import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { axiosClient } from "utils/axiosClient";

export interface RatingResponse {
    count: number;
    next: string;
    previous: string;
    result: RatingResult[];
}

export interface RatingResult {
    id: number;
    rated_to: RatedTo;
    rated_by: RatedBy;
    created_at: string;
    updated_at: string;
    rating: number;
    review: string;
    task_detail: number;
}

export interface RatedTo {
    id: string;
    email: string;
    full_name: string;
}

export interface RatedBy {
    id: string;
    email: string;
    full_name: string;
}

export const useGetTaskerRating = () => {
    return useQuery<RatingResponse>(["tasker-rating"], async () => {
        try {
            const { data } = await axiosClient.get<RatingResponse>(
                "/task/rating/"
            );
            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error?.response?.data?.message);
            }
            throw new Error("Something went wrong");
        }
    });
};
