import axios from "axios";
import { PackageCard } from "staticData/packageCard";
import { SearchBodyData } from "staticData/searchBody";
import { serviceCategory } from "staticData/serviceCategory";
import { services } from "staticData/services";
import { servicesNearYou } from "staticData/servicesNearYouCard";
import { axiosClient } from "utils/axiosClient";
export const getAllServicesNearYou = () => {
    // const response = await axiosClient.get("/services");
    // return response.data;

    return servicesNearYou;
};
export const getAllPackageCard = () => {
    // const response = await axiosClient.get("/packages");
    // return response.data;

    return PackageCard;
};

export const getServiceCategory = () => {
    // const response = await axiosClient.get("/services/category");
    // return response.data;

    return serviceCategory;
};

export const getSearchBody = () => {
    // const response = await axiosClient.get("/searchBody");
    // return response.data;
    return SearchBodyData;
};
export const getServices = () => {
    // const response = await axiosClient.get("/services");
    // return response.data;
    return services;
};

export const postTask = (task: any) => {
    axiosClient.post("/tasks", task);
};
export const postPackage = (packages: any) => {
    axiosClient.post("/packages", packages);
};
export const postService = (service: any) => {
    axiosClient.post("/services", service);
};
