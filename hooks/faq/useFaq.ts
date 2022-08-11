import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "utils/axiosClient";

const fetchFaq = () => {
    return axiosClient.get("/support/faq");
};

export const useFaq = () => {
    return useQuery(["all-faq"], fetchFaq);
};
