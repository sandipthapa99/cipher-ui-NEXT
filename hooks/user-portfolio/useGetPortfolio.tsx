import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "utils/axiosClient";

const fetchPortfolio = () => {
    return axiosClient.get("/tasker/portfolio");
};

export const useGetTaskerPortfolio = () => {
    return useQuery(["tasker-portfolio"], fetchPortfolio);
};
