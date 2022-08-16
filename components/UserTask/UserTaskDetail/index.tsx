import EllipsisDropdown from "@components/common/EllipsisDropdown";
import { GoBack } from "@components/common/GoBack";
import SaveIcon from "@components/common/SaveIcon";
import ShareIcon from "@components/common/ShareIcon";
import { OffererCard } from "@components/UserTask/UserTaskDetail/atoms/OffererCard";
import { QnA } from "@components/UserTask/UserTaskDetail/atoms/QnA";
import { ReadMore } from "@components/UserTask/UserTaskDetail/atoms/ReadMore";
import { Requirements } from "@components/UserTask/UserTaskDetail/atoms/Requirements";
import { TaskImageCarousel } from "@components/UserTask/UserTaskDetail/atoms/TaskImageCarousel";
import { Timeline } from "@components/UserTask/UserTaskDetail/atoms/Timeline";
import {
    faCalendar,
    faClock,
    faEllipsisVertical,
    faLocation,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import type { UserTask } from "staticData/userTasks";

interface UserTaskDetailProps {
    task: UserTask;
    onExitTask: () => void;
}
export const UserTaskDetail = ({ task, onExitTask }: UserTaskDetailProps) => {
    const [isSaveClicked, setIsSaveClicked] = useState(false);

    const handleSaveClick = () => {
        setIsSaveClicked(!isSaveClicked);
    };
    return (
        <div className="aside-detail-wrapper">
            <div className="user-task-detail">
                <GoBack type="button" onClick={onExitTask} className="mb-24" />
                <h4 className="user-task-detail__title">{task.title}</h4>
                <div className="user-task-detail__header">
                    <p className="user-task-detail__header--postedBy">
                        {task.postedBy}
                    </p>
                    <div className="user-task-detail__header--icons">
                        <div className="icon-text">
                            <SaveIcon
                                onSubmit={handleSaveClick}
                                isSaveClicked={isSaveClicked}
                            />
                            <span>Save</span>
                        </div>
                        <div className="icon-text">
                            <ShareIcon />
                            <span>Share</span>
                        </div>
                        <EllipsisDropdown>
                            <FontAwesomeIcon
                                className="svg-icon"
                                color="#000000"
                                icon={faEllipsisVertical}
                            />
                        </EllipsisDropdown>
                    </div>
                </div>
                <div className="user-task-detail__offerer">
                    <TaskImageCarousel images={task.images} />
                    <OffererCard
                        category={task.offeredBy.category}
                        name={task.offeredBy.username}
                        price={task.charge}
                        profileImage={task.offeredBy.profileImage}
                    />
                </div>
                <div className="user-task-detail__icons">
                    <div className="icon-text">
                        <FontAwesomeIcon
                            color="#FE5050"
                            className="svg-icon"
                            icon={faLocation}
                        />
                        <span>{task.location}</span>
                    </div>
                    <div className="icon-text">
                        <FontAwesomeIcon
                            color="#F06700"
                            className="svg-icon"
                            icon={faCalendar}
                        />
                        <span>{task.date}</span>
                    </div>
                    <div className="icon-text">
                        <FontAwesomeIcon
                            color="#3EAEFF"
                            className="svg-icon"
                            icon={faClock}
                        />
                        <span>{task.time}</span>
                    </div>
                </div>
                <h4 className="problem-description">Problem Description</h4>
                <ReadMore
                    className="problem-description-text"
                    maxLength={200}
                    text={task.description}
                />
                <QnA questions={task.questions} />
                <Requirements requirements={task.requirements} />
                <Timeline />
            </div>
        </div>
    );
};
