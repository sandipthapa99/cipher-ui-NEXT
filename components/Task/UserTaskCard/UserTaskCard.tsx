import BigButton from "@components/common/Button";
import {
    faEllipsisVertical,
    faHeart,
    faRibbon,
    faShare,
    faSmile,
    faStar,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { Task } from "types/tasks";

interface Props {
    isButton?: boolean;
    task: Task;
    onTaskClick: (task: Task) => void;
    handleButtonClick?: () => void;
}
export const UserTaskCard = ({ isButton, task, onTaskClick, handleButtonClick }: Props) => {
    return (
        <div className="user-task-card" onClick={() => onTaskClick(task)}>
            <div className="user-task-card__header">
                <Image
                    src={task.user.profileImage}
                    width="80px"
                    height="80px"
                    objectFit="cover"
                    alt={`${task.user.username} profile picture`}
                    className="rounded-circle"
                />

                <div className="user-info">
                    <p className="user-info__username">{task.user.username}</p>
                    <span>
                        <span className="user-info__category">
                            {task.user.category}
                        </span>
                        <span> | </span>
                        <span className="td-text">{task.user.location}</span>
                    </span>
                    <div className="user-ratings">
                        <div className="d-flex align-items-center">
                            <FontAwesomeIcon
                                color="#FAB005"
                                className="svg-icon"
                                icon={faStar}
                            />
                            <span>{task.rating.average}</span>
                            <span>{`(${task.rating.totalRatings})`}</span>
                        </div>
                        <div className="d-flex align-items-center">
                            <FontAwesomeIcon
                                color="#F98900"
                                className="svg-icon"
                                icon={faSmile}
                            />
                            <span>{task.likes}</span>
                        </div>
                        <div className="d-flex align-items-center">
                            <FontAwesomeIcon
                                color="#0693E3"
                                className="svg-icon"
                                icon={faRibbon}
                            />
                            <span>{task.rewardPercentage}</span>
                        </div>
                    </div>
                </div>

                <FontAwesomeIcon
                    className="svg-icon"
                    icon={faEllipsisVertical}
                />
            </div>
            <p className="td-text user-info__bio">{task.user.bio}</p>
            <div className="d-flex justify-content-between user-task-card__footer">
                <div className="icons">
                    <FontAwesomeIcon
                        color="#FE5050"
                        className="svg-icon"
                        icon={faHeart}
                    />
                    <FontAwesomeIcon
                        color="#3EAEFF"
                        className="svg-icon"
                        icon={faShare}
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
                    <p className="task-price">{task.price}</p>
                )}
            </div>
        </div>
    );
};
