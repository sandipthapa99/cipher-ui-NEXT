import React from "react";

import { MyTaskOrder } from "./MyTaskOrder";

export const MyTasks = () => {
    return (
        <div className="my-task">
            <h3>My Tasks</h3>

            <div className="my-task__each-orders">
                <MyTaskOrder />
                <MyTaskOrder />
                <MyTaskOrder />
                <MyTaskOrder />
            </div>
        </div>
    );
};
