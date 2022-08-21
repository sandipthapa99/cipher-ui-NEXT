import { useQuery } from "@tanstack/react-query";
import React from "react";
import { axiosClient } from "utils/axiosClient";

interface TopCategory {
    id: number;
    category: string;
    slug: string;
}
export const useTopCategories = () => {
    return useQuery(["top-categories"], () =>
        axiosClient
            .get<TopCategory[]>("/task/top-categories/")
            .then((res) => res.data)
    );
};
export const TopCategories = () => {
    const { data: topCategories = [] } = useTopCategories();
    return <ul></ul>;
};
