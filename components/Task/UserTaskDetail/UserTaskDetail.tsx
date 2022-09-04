import { UserShortIntro } from "@components/Task/UserTaskDetail/atoms/UserShortIntro";
import { UserTaskDetailHeader } from "@components/Task/UserTaskDetail/atoms/UserTaskDetailHeader";
import { UserTaskReviews } from "@components/Task/UserTaskDetail/atoms/UserTaskReviews";
import { faChevronLeft } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import type { HTMLAttributes } from "react";
import React from "react";
import type { TaskerProps } from "types/taskerProps";
import { axiosClient } from "utils/axiosClient";

import { UserTaskDetailTabs } from "./atoms/UserTaskDetailTabs";

interface UserTaskDetailProps extends HTMLAttributes<HTMLDivElement> {
    maxHeaderWidth?: string;
    taskerDetail: TaskerProps["result"][0];
}

const UserTaskDetail = ({
    maxHeaderWidth,
    taskerDetail,
    ...rest
}: UserTaskDetailProps) => {
    return (
        <div className="user-task-detail-container">
            <Link href="/tasker">
                <a>
                    <FontAwesomeIcon
                        icon={faChevronLeft}
                        className="svg-icon"
                    />
                    Go Back
                </a>
            </Link>
            <UserTaskDetailHeader
                taskerDetail={taskerDetail}
                maxHeaderWidth={maxHeaderWidth}
                activeTaskId={taskerDetail.user.id}
            />
            <UserShortIntro user={taskerDetail} />
            <UserTaskDetailTabs taskerDetail={taskerDetail} />
            <UserTaskReviews activeTaskId={taskerDetail.user.id} />
        </div>
    );
};
export default UserTaskDetail;
