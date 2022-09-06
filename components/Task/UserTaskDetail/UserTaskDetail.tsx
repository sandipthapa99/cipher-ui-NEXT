import { UserShortIntro } from "@components/Task/UserTaskDetail/atoms/UserShortIntro";
import { UserTaskDetailHeader } from "@components/Task/UserTaskDetail/atoms/UserTaskDetailHeader";
import { UserTaskReviews } from "@components/Task/UserTaskDetail/atoms/UserTaskReviews";
import { faChevronLeft } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import type { HTMLAttributes } from "react";
import React from "react";
import type { TaskerProps } from "types/taskerProps";

import { UserTaskDetailTabs } from "./atoms/UserTaskDetailTabs";

interface UserTaskDetailProps extends HTMLAttributes<HTMLDivElement> {
    maxHeaderWidth?: string;
    taskerDetail: TaskerProps["result"][0];
}

const UserTaskDetail = ({
    maxHeaderWidth,
    taskerDetail,
}: UserTaskDetailProps) => {
    return (
        <div className="user-task-detail-container">
            <div className="mb-5">
                <Link href="/tasker">
                    <a>
                        <FontAwesomeIcon
                            icon={faChevronLeft}
                            className="svg-icon"
                        />
                        Go Back
                    </a>
                </Link>
            </div>
            <UserTaskDetailHeader
                taskerDetail={taskerDetail}
                maxHeaderWidth={maxHeaderWidth}
            />
            <UserShortIntro user={taskerDetail} />
            <UserTaskDetailTabs taskerDetail={taskerDetail} />
            <UserTaskReviews activeTaskId={taskerDetail?.user?.id} />
        </div>
    );
};
export default UserTaskDetail;
