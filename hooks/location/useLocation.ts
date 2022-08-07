import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useGeolocated } from "react-geolocated";
import { axiosClient } from "utils/axiosClient";

const fetchLocation = async () => {
    return axiosClient.get("https://ipapi.co/json/");
};

export const useLocation = () => {
    return useQuery(["location"], () => fetchLocation());
};
