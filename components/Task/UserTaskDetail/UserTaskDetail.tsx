import { UserShortIntro } from "@components/Task/UserTaskDetail/atoms/UserShortIntro";
import { UserTaskDetailHeader } from "@components/Task/UserTaskDetail/atoms/UserTaskDetailHeader";
import { UserTaskReviews } from "@components/Task/UserTaskDetail/atoms/UserTaskReviews";
import { faChevronLeft } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import type { HTMLAttributes } from "react";
import React from "react";
import type { ServicesValueProps } from "types/serviceCard";
import type { ITasker } from "types/tasker";

import { UserTaskDetailTabs } from "./atoms/UserTaskDetailTabs";

interface UserTaskDetailProps extends HTMLAttributes<HTMLDivElement> {
    maxHeaderWidth?: string;
    taskerDetail: ITasker;
    taskerService: ServicesValueProps;
    taskerHimself?: boolean;
}

const UserTaskDetail = ({
    maxHeaderWidth,
    taskerDetail,
    taskerService,
    taskerHimself,
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
                    taskerHimself={taskerHimself}
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
