import { useQuery } from "@tanstack/react-query";
import React from "react";
import type { MyTaskProps } from "types/myTasksProps";
import { axiosClient } from "utils/axiosClient";

import { MyTaskOrder } from "./MyTaskOrder";

export const MyTasks = () => {
    const { data: mytaskData } = useQuery(["my-task"], async () => {
        const response = await axiosClient.get("/task/my-task/");
        return response.data.result;
    });

    return (
        <div className="my-task">
            <h3>My Tasks</h3>

            <div className="my-task__each-orders">
                {mytaskData &&
                    mytaskData?.map((item: MyTaskProps, index: number) => (
                        <MyTaskOrder key={index} myTask={item} />
                    ))}
            </div>
        </div>
    );
};
