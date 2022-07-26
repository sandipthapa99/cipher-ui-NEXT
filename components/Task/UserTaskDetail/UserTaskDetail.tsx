import { UserTaskDetailHeader } from "@components/Task/UserTaskDetail/atoms/UserTaskDetailHeader";
import React from "react";
import { TaskDetail } from "staticData/taskDetail";

interface UserTaskDetailProps {
    taskDetail: TaskDetail;
}

const UserTaskDetail = ({ taskDetail }: UserTaskDetailProps) => {
    return (
        <div className="user-task-detail-container">
            <UserTaskDetailHeader taskDetail={taskDetail} />
        </div>
    );
};

export default UserTaskDetail;
