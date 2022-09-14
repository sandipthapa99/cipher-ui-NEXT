import { reviewsContent } from "staticData/reviews";
import { SearchBodyData } from "staticData/searchBody";
import { serviceHighlights } from "staticData/serviceHighlights";
import { services } from "staticData/services";
import { axiosClient } from "utils/axiosClient";

//Get-------------------
// export const getAllServicesNearYou = () => {
//     // const response = await axiosClient.get("/services");
//     // return response.data;

//     return servicesNearYou;
// };

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
export const getReviews = () => {
    // const response = await axiosClient.get("/reviews");
    // return response.data;
    return reviewsContent;
};
export const getServiceHighlights = () => {
    // const response = await axiosClient.get("/services/highlights");
    // return response.data;
    return serviceHighlights;
};

//POST----------------

export const postTask = (task: any) => {
    axiosClient.post("/tasks", task);
};
export const postPackage = (packages: any) => {
    axiosClient.post("/packages", packages);
};
export const postService = (service: any) => {
    axiosClient.post("/services", service);
};
