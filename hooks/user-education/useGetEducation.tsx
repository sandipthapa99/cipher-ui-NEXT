import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "utils/axiosClient";

const fetchEducation = () => {
    return axiosClient.get("/tasker/education");
};

export const useGetTaskerEducation = () => {
    return useQuery(["tasker-education"], fetchEducation);
};
