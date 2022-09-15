import {
    faCalendar,
    faClockEight,
    faLocationDot,
    faUserGroup,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import Link from "next/link";
import type { ITask } from "types/task";

import CardBtn from "./CardBtn";
import ShareIcon from "./ShareIcon";
interface TaskCardProps {
    task: ITask;
}
const TaskCard = ({ task }: TaskCardProps) => {
    const { title, charge, description, location, status, currency, slug } =
        task;

    return (
        <div className="task-card-block p-5">
            <Link href={`${slug}`}>
                <a>
                    <div className="task-card-block__header d-flex flex-column flex-sm-row justify-content-between">
                        <h1 className="title">{title}</h1>
                        <h2 className="charge">
                            {currency ? currency.code : "Rs"} {charge}
                        </h2>
                    </div>
                    <div className="task-card-block__body">
                        <p className="task-description">{description}</p>
                        <div className="task-location-time d-flex flex-column flex-sm-row">
                            <p className="d-flex align-items-center pe-4 location">
                                <FontAwesomeIcon
                                    icon={faLocationDot}
                                    className="svg-icon"
                                />
                                {location}
                            </p>
                            <p className="d-flex align-items-center date pe-4 my-3 my-sm-0">
                                <FontAwesomeIcon
                                    icon={faCalendar}
                                    className="svg-icon"
                                />
                                {task?.created_at &&
                                    format(
                                        new Date(task?.created_at),
                                        "MMMM dd, yyyy"
                                    )}
                            </p>
                            <div className="d-flex align-items-center pe-4 time">
                                <FontAwesomeIcon
                                    icon={faClockEight}
                                    className="svg-icon"
                                />
                                {task?.created_at &&
                                    format(new Date(task?.created_at), "p")}
                            </div>
                        </div>
                    </div>
                </a>
            </Link>
            <div className="task-card-block__footer d-flex flex-column flex-sm-row justify-content-between">
                <div className="left d-flex align-items-center">
                    <div className="share d-flex align-items-center">
                        <ShareIcon url={""} quote={""} hashtag={""} />
                        Share
                    </div>
                    <Link href={`/task/${slug}` ?? "/"}>
                        <a>
                            <p className="applicants  d-flex align-items-center">
                                <FontAwesomeIcon
                                    icon={faUserGroup}
                                    className="svg-icon"
                                />
                                {task?.no_of_applicants} Applied
                            </p>
                        </a>
                    </Link>
                </div>
                <div className="right">
                    <Link href={`/task/${slug}` ?? "/"}>
                        <a>
                            <CardBtn
                                btnTitle={status}
                                backgroundColor={
                                    status == "Completed"
                                        ? "#FE5050"
                                        : status == "Ongoing"
                                        ? "#0693E3"
                                        : "#38C675"
                                }
                            />
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default TaskCard;
