import { Alert } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
import type { MyTaskProps } from "types/myTasksProps";
import { axiosClient } from "utils/axiosClient";

import { MyTaskOrder } from "./MyTaskOrder";

export const MyTasks = () => {
    const { data: mytaskData } = useQuery(["my-task"], async () => {
        const response = await axiosClient.get("/task/my-task/");
        return response.data.result;
    });

    const router = useRouter();

    console.log("task data", mytaskData);

    return (
        <div className="my-task">
            <h3>My Tasks</h3>

            <div className="my-task__each-orders">
                {mytaskData?.length ? (
                    mytaskData?.map((item: MyTaskProps, index: number) => (
                        <div
                            className="task-wrapper"
                            key={index}
                            onClick={() =>
                                router.push({
                                    pathname: `/task/${item?.slug}`,
                                })
                            }
                        >
                            <MyTaskOrder
                                task_id={item?.id}
                                assigner_id={item?.assigner?.id}
                                created_at={item?.created_at}
                                image={item?.images[0]?.media}
                                title={item?.title}
                                assigner_name={item?.assigner?.full_name}
                                budget_from={item?.budget_from}
                                budget-to={item?.budget_to}
                                budget_type={item?.budget_type}
                                status={item?.status}
                                currency={item?.currency?.code}
                                budget_to={item?.budget_to}
                            />
                        </div>
                    ))
                ) : (
                    <Alert title="NO DATA AVAILABLE !!!" color="orange">
                        Sorrry, You have no task data to show
                    </Alert>
                )}
            </div>
        </div>
    );
};
