import ShareIcon from "@components/common/ShareIcon";
import {
    faCalendar,
    faClockEight,
    faLocationArrow,
    faLocationDot,
    faUserGroup,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import type { ITask } from "types/task";
// import type { TaskCardProps } from "types/taskCard";
// css for this file is done in _gettingStartedTask.scss page

interface TaskCardProps {
    task: ITask;
    onTaskClick?: (task: ITask) => void;
}
const TaskCard = ({ task, onTaskClick }: TaskCardProps) => {
    const router = useRouter();
    const query = router.query.slug;

    const {
        id: taskId,
        title,
        budget_type,
        budget_from,
        budget_to,
        currency,
        location,
        time,
        date,
        applicants_count,
    } = task;
    return (
        <div
            data-active={JSON.stringify(query === taskId)}
            className="task-applied-card-block"
            onClick={() => onTaskClick?.(task)}
        >
            <div className="d-flex justify-content-between flex-column flex-sm-row task-applied-card-block__header">
                <span className="title">{title}</span>
                {budget_from && budget_to ? (
                    <span className="charge">
                        {currency} {budget_from} - {budget_to}
                        {budget_type === "Hourly"
                            ? "/hr"
                            : budget_type === "Monthly"
                            ? "/mn"
                            : ""}
                    </span>
                ) : (
                    <span className="charge">
                        {currency} {budget_to}
                    </span>
                )}
            </div>
            <div className="task-applied-card-block__body">
                <p className="location mb-3 d-flex align-items-center">
                    <FontAwesomeIcon
                        icon={faLocationDot}
                        className="svg-icon"
                    />
                    <span>{location}</span>
                </p>
                <div className="task-location-time d-flex justify-content-between">
                    <span className="time me-4 d-flex align-items-center">
                        <FontAwesomeIcon
                            icon={faClockEight}
                            className="svg-icon"
                        />
                        <span> {time}</span>
                    </span>
                    <span className="date d-flex align-items-center">
                        <FontAwesomeIcon
                            icon={faCalendar}
                            className="svg-icon"
                        />
                        <span> {date}</span>
                    </span>
                    <span className="date d-flex align-items-center">
                        <FontAwesomeIcon
                            icon={faLocationArrow}
                            className="svg-icon"
                        />
                        <span> 2 Km away</span>
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
                    {applicants_count} Applied
                </span>
            </div>
        </div>
    );
};
export default TaskCard;
