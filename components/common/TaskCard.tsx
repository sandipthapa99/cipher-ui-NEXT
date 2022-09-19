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

type RequiredTaskKeys =
    | "title"
    | "charge"
    | "description"
    | "location"
    | "start_date"
    | "start_time"
    | "status"
    | "currency"
    | "slug";
interface TaskCardProps {
    task: Pick<ITask, RequiredTaskKeys>;
    isSaved?: boolean;
}
const TaskCard = ({ task, isSaved }: TaskCardProps) => {
    const {
        title,
        charge,
        description,
        location,
        start_date,
        start_time,
        status,
        currency,
        slug,
    } = task;

    function getDateFromHours(time: any) {
        time = time ? time?.split(":") : "";
        const now = new Date();
        return new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            ...time
        );
    }

    const formattedtime = getDateFromHours(start_time);
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
                                {start_date
                                    ? format(
                                          new Date(start_date),
                                          "MMMM dd, yyyy"
                                      )
                                    : ""}
                            </p>
                            <div className="d-flex align-items-center pe-4 time">
                                <FontAwesomeIcon
                                    icon={faClockEight}
                                    className="svg-icon"
                                />
                                {format(new Date(formattedtime), "p")}
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
                                100 Applied
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
