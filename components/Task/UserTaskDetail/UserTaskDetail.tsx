import { UserShortIntro } from "@components/Task/UserTaskDetail/atoms/UserShortIntro";
import { UserTaskDetailHeader } from "@components/Task/UserTaskDetail/atoms/UserTaskDetailHeader";
import { UserTaskReviews } from "@components/Task/UserTaskDetail/atoms/UserTaskReviews";
import { ChevronLeft } from "@mui/icons-material";
import Link from "next/link";
import type { HTMLAttributes } from "react";
import React from "react";
import type { ServicesValueProps } from "types/serviceCard";
import type { ITaskApiResponse } from "types/task";
import type { ITasker } from "types/tasker";

import { UserTaskDetailTabs } from "./atoms/UserTaskDetailTabs";

interface UserTaskDetailProps extends HTMLAttributes<HTMLDivElement> {
    maxHeaderWidth?: string;
    taskerDetail: ITasker;
    taskerService: ServicesValueProps;
    taskerTask: ITaskApiResponse;
    taskerHimself?: boolean;
}

const UserTaskDetail = ({
    maxHeaderWidth,
    taskerDetail,
    taskerService,
    taskerTask,
    taskerHimself,
}: UserTaskDetailProps) => {
    return (
        <div className="aside-detail-wrapper">
            <div className="user-task-detail-container">
                <div className="mb-5">
                    <Link href="/tasker">
                        <a>
                            <ChevronLeft className="svg-icon" />
                            Go Back
                        </a>
                    </Link>
                </div>
                <UserTaskDetailHeader
                    taskerDetail={taskerDetail}
                    maxHeaderWidth={maxHeaderWidth}
                    taskerHimself={taskerHimself}
                />
                <UserShortIntro user={taskerDetail} />
                <UserTaskDetailTabs
                    taskerTask={taskerTask}
                    taskerService={taskerService}
                    taskerDetail={taskerDetail}
                />
                <UserTaskReviews activeTaskId={taskerDetail?.user?.id} />
            </div>
        </div>
    );
};
export default UserTaskDetail;
