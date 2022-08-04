import { useEffect, useState } from "react";
import { axiosClient } from "utils/axiosClient";
export const SearchBodyData = [
    {
        id: "0",
        number: "30",
        color: "#ECF7FF",
        textOne: "Tasks Assigned",
        textColor: "#3EAEFF",
    },
    {
        id: "1",
        number: "30",
        color: "#EBF9F1",
        textOne: "Tasks Completed",
        textColor: "#38C675",
    },
    {
        id: "2",
        number: "20",
        color: "#FFF5E5",
        textOne: "Tasks In Progress",
        textColor: "#FF9700",
    },
    {
        id: "3",
        number: "4",
        color: "#FFEDED",
        textOne: "Tasks Cancelled",
        textColor: "#FE5050",
    },
];

export const SearchBodyClient = () => {
    const [searchBody, setSearchBody] =
        useState<typeof SearchBodyData>(SearchBodyData);

    // const service = axiosClient.get(`/searchBodyClient`);
    useEffect(() => {
        setSearchBody(SearchBodyData);
    }, []);

    return searchBody;
};
