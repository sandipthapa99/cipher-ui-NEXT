import { GoBack } from "@components/common/GoBack";
import { UserShortIntro } from "@components/Task/UserTaskDetail/atoms/UserShortIntro";
import { UserTaskDetailHeader } from "@components/Task/UserTaskDetail/atoms/UserTaskDetailHeader";
import { UserTaskDetailTabs } from "@components/Task/UserTaskDetail/atoms/UserTaskDetailTabs";
import { UserTaskReviews } from "@components/Task/UserTaskDetail/atoms/UserTaskReviews";
import { useQuery } from "@tanstack/react-query";
import type { HTMLAttributes } from "react";
import React from "react";
import { axiosClient } from "utils/axiosClient";

interface UserTaskDetailProps extends HTMLAttributes<HTMLDivElement> {
    // taskDetail: TaskDetail;
    onExitTaskDetail: () => void;
    activeTaskId: string;
    maxHeaderWidth?: string;
}

const UserTaskDetail = ({
    onExitTaskDetail,
    activeTaskId,
    maxHeaderWidth,
    className,
    ...rest
}: UserTaskDetailProps) => {
    const { data: taskerDetail } = useQuery(
        ["tasker-detail", activeTaskId],
        async () => {
            const response = await axiosClient.get(
                `/tasker/profile/${activeTaskId}`
            );
            return response?.data;
        }
    );

    const containerClass = `user-task-detail-container ${className}`;
    return (
        <div {...rest} className={containerClass}>
            <GoBack
                type="button"
                onClick={onExitTaskDetail}
                className="mb-24"
            />
            <UserTaskDetailHeader
                taskerDetail={taskerDetail}
                maxHeaderWidth={maxHeaderWidth}
                activeTaskId={activeTaskId}
            />
            <UserShortIntro user={taskerDetail} />
            <UserTaskDetailTabs user={taskerDetail} />
            <UserTaskReviews />
        </div>
    );
};
export default UserTaskDetail;
