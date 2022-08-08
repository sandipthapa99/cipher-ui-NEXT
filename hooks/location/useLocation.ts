import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchLocation = async () => {
    return axios.get("https://ipapi.co/json/");
};

export const useLocation = () => {
    return useQuery(["location"], fetchLocation);
};
