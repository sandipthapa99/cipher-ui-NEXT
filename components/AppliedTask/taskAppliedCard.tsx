import ShareIcon from "@components/common/ShareIcon";
import {
    faCalendar,
    faClockEight,
    faLocationArrow,
    faLocationDot,
    faUserGroup,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import urls from "constants/urls";
import { format } from "date-fns";
import { useData } from "hooks/use-data";
import Link from "next/link";
import { useRouter } from "next/router";
import type { ITask, TaskerCount } from "types/task";
import { getPageUrl } from "utils/helpers";
// import type { TaskCardProps } from "types/taskCard";
// css for this file is done in _gettingStartedTask.scss page

interface TaskCardProps {
    task: ITask;
    type?: string;
    onTaskClick?: (task: ITask) => void;
}
const TaskCard = ({ task, type }: TaskCardProps) => {
    const router = useRouter();
    const { id } = router.query;
    const {
        id: taskId,
        title,
        budget_type,
        budget_from,
        budget_to,
        currency,
        start_time: time,
        start_date: date,
        slug,
    } = task;
    console.log(
        "🚀 ~ file: taskAppliedCard.tsx ~ line 40 ~ TaskCard ~ task",
        task
    );

    const { data: taskApplicants } = useData<TaskerCount>(
        ["get-task-applicants", taskId],
        `${urls.task.taskApplicantsNumber}/${taskId}`
    );

    const applicants_count = taskApplicants?.data.count[0].tasker_count;

    return (
        <div
            data-active={JSON.stringify(String(id) === taskId)}
            className="task-applied-card-block"
        >
            <Link
                href={
                    type === "you may like"
                        ? `/task-you-may-like/${task?.slug}`
                        : `/task/${task?.id}`
                }
            >
                <a>
                    <div className="d-flex justify-content-between flex-column flex-sm-row task-applied-card-block__header">
                        <span className="title">{title}</span>
                        {budget_from && budget_to ? (
                            <span className="charge">
                                {currency.symbol} {budget_from} - {budget_to}
                                {budget_type === "Hourly"
                                    ? "/hr"
                                    : budget_type === "Monthly"
                                    ? "/mn"
                                    : ""}
                            </span>
                        ) : (
                            <span className="charge">
                                {currency.symbol} {budget_to}
                            </span>
                        )}
                    </div>
                    <div className="task-applied-card-block__body">
                        <p className="location mb-3 d-flex align-items-center">
                            <FontAwesomeIcon
                                icon={faLocationDot}
                                className="svg-icon"
                            />
                            <span>
                                {task?.location
                                    ? task.location
                                    : "Not Provided"}
                            </span>
                        </p>
                        <div className="task-location-time d-flex justify-content-between">
                            <span className="time me-4 d-flex align-items-center">
                                <FontAwesomeIcon
                                    icon={faClockEight}
                                    className="svg-icon"
                                />
                                <span>
                                    {task?.created_at
                                        ? format(
                                              new Date(task?.created_at),
                                              "p"
                                          )
                                        : "N/A"}
                                </span>
                            </span>
                            <span className="date d-flex align-items-center">
                                <FontAwesomeIcon
                                    icon={faCalendar}
                                    className="svg-icon"
                                />
                                <span>
                                    {" "}
                                    {task?.created_at
                                        ? format(
                                              new Date(task?.created_at),
                                              "PP"
                                          )
                                        : "N/A"}
                                </span>
                            </span>
                            {/* <span className="date d-flex align-items-center">
                                <FontAwesomeIcon
                                    icon={faLocationArrow}
                                    className="svg-icon"
                                />
                                <span> 2 Km away</span>
                            </span> */}
                        </div>
                    </div>
                </a>
            </Link>
            <div className="task-applied-card-block__footer d-flex mt-4">
                <ShareIcon
                    url={getPageUrl()}
                    quote="Please Share this task for all"
                    hashtag="Homaale-task"
                />
                <span className="share-label">Share</span>

                <Link
                    href={
                        type === "you may like"
                            ? `/task-you-may-like/${task?.slug}`
                            : `/task/${task?.slug}`
                    }
                >
                    <a>
                        <span className="applicants d-flex align-items-center text-black">
                            <FontAwesomeIcon
                                icon={faUserGroup}
                                className="svg-icon"
                            />
                            {applicants_count} Applied
                        </span>
                    </a>
                </Link>
            </div>
        </div>
    );
};
export default TaskCard;
