import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "utils/axiosClient";

const fetchUserBookmarks = () => {
    return axiosClient.get("/task/bookmark?ordering=user&page=1&page_size=1");
};

const fetchServicesBookmarks = () => {
    return axiosClient.get("/task/bookmark?ordering=task&page=1&page_size=1");
};

//user bookmarked
export const useFetchUserBookmarks = () => {
    return useQuery(["saved-users"], fetchUserBookmarks);
};

export const useFetchServicesBookmarks = () => {
    return useQuery(["saved-services"], fetchServicesBookmarks);
};
