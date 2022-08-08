import { useQuery } from "@tanstack/react-query";



import { axiosClient } from "utils/axiosClient";

const fetchLocation = async () => {
    return axiosClient.get("https://ipapi.co/json/");
};

export const useLocation = () => {
    return useQuery(["location"], fetchLocation);
};
