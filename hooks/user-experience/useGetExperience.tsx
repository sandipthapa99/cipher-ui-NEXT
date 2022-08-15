import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "utils/axiosClient";

const fetchExperience = () => {
    return axiosClient.get("/tasker/experience");
};

export const useGetTaskerExperience = () => {
    return useQuery(["tasker-experience"], fetchExperience);
};
