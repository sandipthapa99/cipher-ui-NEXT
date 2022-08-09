import { useQuery } from "@tanstack/react-query";
import nookies from "nookies";
import { axiosClient } from "utils/axiosClient";

export const fetchTaskDetail = (slug: string) => {
    const taskDetail = axiosClient.get(`/task/task/${slug}`);
    return taskDetail;
};
