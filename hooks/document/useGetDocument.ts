import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "utils/axiosClient";

const fetchDocuments = () => {
    return axiosClient.get("/tasker/document");
};

export const useGetDocument = () => {
    return useQuery(["all-document"], fetchDocuments);
};
