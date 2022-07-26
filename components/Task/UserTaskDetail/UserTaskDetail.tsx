import { UserShortIntro } from "@components/Task/UserTaskDetail/atoms/UserShortIntro";
import { UserTaskDetailHeader } from "@components/Task/UserTaskDetail/atoms/UserTaskDetailHeader";
import { UserTaskDetailTabs } from "@components/Task/UserTaskDetail/atoms/UserTaskDetailTabs";
import { UserTaskReviews } from "@components/Task/UserTaskDetail/atoms/UserTaskReviews";
import React from "react";
import { TaskDetail } from "staticData/taskDetail";

interface UserTaskDetailProps {
    taskDetail: TaskDetail;
}

const UserTaskDetail = ({ taskDetail }: UserTaskDetailProps) => {
    return (
        <div className="user-task-detail-container">
            <UserTaskDetailHeader taskDetail={taskDetail} />
            <UserShortIntro user={taskDetail.user} />
            <UserTaskDetailTabs user={taskDetail.user} />
            <UserTaskReviews />
        </div>
    );
};

export default UserTaskDetail;
