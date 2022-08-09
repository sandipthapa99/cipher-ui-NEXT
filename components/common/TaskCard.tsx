import {
    faCalendar,
    faClockEight,
    faLocationDot,
    faShare,
    faUserGroup,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { TaskCardProps } from "types/taskCard";

import CardBtn from "./CardBtn";
// css for this file is done in _gettingStartedTask.scss page
const TaskCard = ({
    title,
    charge,
    description,
    location,
    date,
    time,
}: TaskCardProps) => {
    return (
        <div className="task-card-block">
            <div className="task-card-block__header d-flex flex-column flex-sm-row justify-content-between">
                <h1 className="title">{title}</h1>
                <h1 className="charge">Rs {charge}</h1>
            </div>
            <div className="task-card-block__body">
                <p className="task-description">{description}</p>
                <div className="task-location-time d-flex flex-column flex-sm-row justify-content-between">
                    <p className="d-flex align-items-center location">
                        <FontAwesomeIcon
                            icon={faLocationDot}
                            className="svg-icon"
                        />
                        {location}
                    </p>
                    <p className="d-flex align-items-center date my-3 my-sm-0">
                        <FontAwesomeIcon
                            icon={faCalendar}
                            className="svg-icon"
                        />
                        {date}
                    </p>
                    <p className="d-flex align-items-center time">
                        <FontAwesomeIcon
                            icon={faClockEight}
                            className="svg-icon"
                        />
                        {time}
                    </p>
                </div>
            </div>
            <div className="task-card-block__footer d-flex flex-column flex-sm-row justify-content-between">
                <div className="left d-flex align-items-center">
                    <p className="share d-flex align-items-center">
                        <FontAwesomeIcon icon={faShare} className="svg-icon" />
                        Share
                    </p>
                    <p className="applicants  d-flex align-items-center">
                        <FontAwesomeIcon
                            icon={faUserGroup}
                            className="svg-icon"
                        />
                        100 Applied
                    </p>
                </div>
                <div className="right mt-3 mt-sm-0">
                    <CardBtn btnTitle="Apply" backgroundColor="#38C675" />
                </div>
            </div>
        </div>
    );
};
export default TaskCard;
