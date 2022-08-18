import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useTaskers = () => {
    return useQuery<Tasker[], Error>(["taskers"], async () => {
        try {
            const { data } = await axios.get<Tasker[]>("/data/taskers.json");
            return data;
        } catch (error: any) {
            throw new Error(
                error?.response?.data?.message ?? "Failed to fetch taskers"
            );
        }
    });
};
export type Tasker = {
    id: number;
    user: {
        category: string;
        profileImage: string;
        username: string;
        location: string;
        bio: string;
    };
    likes: number;
    rewardPercentage: string;
    price: string;
    rating: {
        average: number;
        totalRatings: number;
    };
};
