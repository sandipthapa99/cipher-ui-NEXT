import BigButton from "@components/common/Button";
import SaveIcon from "@components/common/SaveIcon";
import ShareIcon from "@components/common/ShareIcon";
import {
    faEllipsisVertical,
    faRibbon,
    faSmile,
    faStar,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import type { Task, Tasker } from "types/tasks";

interface Props {
    isButton?: boolean;
    task: Tasker;
    onTaskClick: (task: Task) => void;
    handleButtonClick?: () => void;
    taskId?: number;
}
export const UserTaskCard = ({
    isButton,
    task,
    onTaskClick,
    handleButtonClick,
    taskId,
}: Props) => {
    console.log("task inside userTaskCard", task);
    return (
        <div className="user-task-card" onClick={() => onTaskClick(task)}>
            <div className="user-task-card__header">
                <Image
                    src={
                        task?.profile?.profile_image ??
                        "/community/gallery2.png"
                    }
                    width="80px"
                    height="80px"
                    objectFit="cover"
                    alt={`${task?.profile?.full_name} profile picture`}
                    className="rounded-circle header-image"
                />

                <div className="user-info">
                    <p className="user-info__username">
                        {task?.profile?.full_name}
                    </p>
                    <span>
                        <span className="user-info__category">
                            {task?.profile?.full_name}
                        </span>
                        <span> | </span>
                        <span className="td-text">{"location here"}</span>
                    </span>
                    <div className="user-ratings">
                        <div className="d-flex align-items-center">
                            <FontAwesomeIcon
                                color="#FAB005"
                                className="svg-icon"
                                icon={faStar}
                            />
                            <span>{"4"}</span>
                            <span>{`(${"5"})`}</span>
                        </div>
                        <div className="d-flex align-items-center">
                            <FontAwesomeIcon
                                color="#F98900"
                                className="svg-icon"
                                icon={faSmile}
                            />
                            <span>{5}</span>
                        </div>
                        <div className="d-flex align-items-center">
                            <FontAwesomeIcon
                                color="#0693E3"
                                className="svg-icon"
                                icon={faRibbon}
                            />
                            <span>{"90%"}</span>
                        </div>
                    </div>
                </div>

                <FontAwesomeIcon
                    className="svg-icon"
                    icon={faEllipsisVertical}
                />
            </div>
            <p className="td-text user-info__bio">{task?.profile?.bio}</p>
            <div className="d-flex justify-content-between user-task-card__footer">
                <div className="icons">
                    <SaveIcon />
                    <ShareIcon
                        url={`http://localhost:3005/tasker?taskerId=${taskId}`}
                        quote={"Tasker from cipher project"}
                        hashtag={"cipher-tasker"}
                    />
                </div>
                {isButton === true && (
                    <BigButton
                        btnTitle={"Collab"}
                        backgroundColor={"#211D4F"}
                        textColor={"white"}
                        handleClick={handleButtonClick}
                    />
                )}
                {isButton === false && (
                    <p className="task-price">{"currency"}</p>
                )}
            </div>
        </div>
    );
};
