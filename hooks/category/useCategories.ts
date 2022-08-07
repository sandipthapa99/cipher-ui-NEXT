import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "utils/axiosClient";

const fetchCategory = async () => {
    return axiosClient.get("/task/cms/task-category/");
};

export const useCategories = () => {
    return useQuery(["categories"], fetchCategory);
};
