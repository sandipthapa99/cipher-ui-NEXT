import { GoBack } from "@components/common/GoBack";
import { UserShortIntro } from "@components/Task/UserTaskDetail/atoms/UserShortIntro";
import { UserTaskDetailHeader } from "@components/Task/UserTaskDetail/atoms/UserTaskDetailHeader";
import { UserTaskDetailTabs } from "@components/Task/UserTaskDetail/atoms/UserTaskDetailTabs";
import { UserTaskReviews } from "@components/Task/UserTaskDetail/atoms/UserTaskReviews";
import type { HTMLAttributes } from "react";
import React from "react";
import type { TaskDetail } from "staticData/taskDetail";

interface UserTaskDetailProps extends HTMLAttributes<HTMLDivElement> {
    taskDetail: TaskDetail;
    onExitTaskDetail: () => void;
    activeTaskId: number;
    maxHeaderWidth?: string;
}

const UserTaskDetail = ({
    taskDetail,
    onExitTaskDetail,
    activeTaskId,
    maxHeaderWidth,
    className,
    ...rest
}: UserTaskDetailProps) => {
    const containerClass = `user-task-detail-container ${className}`;
    return (
        <div {...rest} className={containerClass}>
            <GoBack
                type="button"
                onClick={onExitTaskDetail}
                className="mb-24"
            />
            <UserTaskDetailHeader
                maxHeaderWidth={maxHeaderWidth}
                taskDetail={taskDetail}
                activeTaskId={activeTaskId}
            />
            <UserShortIntro user={taskDetail.user} />
            <UserTaskDetailTabs />
            <UserTaskReviews />
        </div>
    );
};
export default UserTaskDetail;
