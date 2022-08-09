import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "utils/axiosClient";

const postData = async (api: string, values: any) => {
    return axiosClient.post(api, JSON.stringify(values));
};
export const usePost = (apiEndPoint: string, values: any) => {
    return useQuery(["post"], () => () => postData(apiEndPoint, values));
};
