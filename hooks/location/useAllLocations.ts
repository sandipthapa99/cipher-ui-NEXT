import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "utils/axiosClient";

const fetchAllLocations =async  () => {
    return axiosClient.get("https://restcountries.com/v3.1/all");
}
export const useAllLocations = () => {
    return useQuery(["locations"],fetchAllLocations)

}