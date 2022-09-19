import { UserShortIntro } from "@components/Task/UserTaskDetail/atoms/UserShortIntro";
import { UserTaskDetailHeader } from "@components/Task/UserTaskDetail/atoms/UserTaskDetailHeader";
import { UserTaskReviews } from "@components/Task/UserTaskDetail/atoms/UserTaskReviews";
import { faChevronLeft } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import type { HTMLAttributes } from "react";
import React from "react";
import type { ServicesValueProps } from "types/serviceCard";
import type { TaskerProps } from "types/taskerProps";

import { UserTaskDetailTabs } from "./atoms/UserTaskDetailTabs";

interface UserTaskDetailProps extends HTMLAttributes<HTMLDivElement> {
    maxHeaderWidth?: string;
    taskerDetail: TaskerProps["result"][0];
    taskerService: ServicesValueProps;
}

const UserTaskDetail = ({
    maxHeaderWidth,
    taskerDetail,
    taskerService,
}: UserTaskDetailProps) => {
    return (
        <div className="aside-detail-wrapper">
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
                <UserTaskDetailTabs
                    taskerService={taskerService}
                    taskerDetail={taskerDetail}
                />
                <UserTaskReviews activeTaskId={taskerDetail?.user?.id} />
            </div>
        </div>
    );
};
export default UserTaskDetail;
