import ShareIcon from "@components/common/ShareIcon";
import {
    faCalendar,
    faClockEight,
    faLocationArrow,
    faLocationDot,
    faUserGroup,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { TaskCardProps } from "types/taskCard";
// css for this file is done in _gettingStartedTask.scss page
const TaskCard = ({
    title,
    location,
    date,
    time,
    startPrice,
    endPrice,
    currency,
    taskId,
    ...rest
}: TaskCardProps) => {
    return (
        <div className="task-applied-card-block" {...rest}>
            <div className="d-flex justify-content-between flex-column flex-sm-row task-applied-card-block__header">
                <span className="title">{title}</span>
                <span className="charge">
                    {currency} {startPrice} {endPrice && "-" + endPrice}/hr
                </span>
            </div>
            <div className="task-applied-card-block__body">
                <p className="location mb-3">
                    <FontAwesomeIcon
                        icon={faLocationDot}
                        className="svg-icon"
                    />
                    {location}
                </p>
                <div className="task-location-time d-flex justify-content-between">
                    <span className="time me-4">
                        <FontAwesomeIcon
                            icon={faClockEight}
                            className="svg-icon"
                        />
                        {time}
                    </span>
                    <span className="date">
                        <FontAwesomeIcon
                            icon={faCalendar}
                            className="svg-icon"
                        />
                        {date}
                    </span>
                    <span className="date">
                        <FontAwesomeIcon
                            icon={faLocationArrow}
                            className="svg-icon"
                        />
                        2 Km away
                    </span>
                </div>
            </div>
            <div className="task-applied-card-block__footer d-flex mt-4">
                <ShareIcon
                    url={`http://localhost:3005/task/${taskId}`}
                    quote="Please Share this task for all"
                    hashtag="cipher-task"
                />
                <span className="share-label">Share</span>

                <span className="applicants d-flex align-items-center">
                    <FontAwesomeIcon icon={faUserGroup} className="svg-icon" />
                    100 Applied
                </span>
            </div>
        </div>
    );
};
export default TaskCard;
