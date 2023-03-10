import { SearchBodyData } from "staticData/searchBody";
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
