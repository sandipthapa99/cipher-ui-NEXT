import {
    faCalendar,
    faClockEight,
    faLocationDot,
    faUserGroup,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spoiler } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import urls from "constants/urls";
import { format } from "date-fns";
import { useIsBookmarked } from "hooks/use-bookmarks";
import { useData } from "hooks/use-data";
import parser from "html-react-parser";
import Link from "next/link";
import type { ITask, TaskerCount } from "types/task";

import CardBtn from "./CardBtn";
import SaveIcon from "./SaveIcon";
import ShareIcon from "./ShareIcon";

interface TaskCardProps {
    task: ITask;
    isSaved?: boolean;
}
const TaskCard = ({ task, isSaved }: TaskCardProps) => {
    const { title, description, location, status, currency, slug, images, id } =
        task;

    const { data: taskApplicants } = useData<TaskerCount>(
        ["get-task-applicants", id],
        `${urls.task.taskApplicantsNumber}/${id}`
    );
    const applicants_count = taskApplicants?.data.count[0].tasker_count;

    const isTaskBookmarked = useIsBookmarked("entityservice", id);
    const queryClient = useQueryClient();
    return (
        <div className="task-card-block p-5">
            <Link href={`${slug}`}>
                <a>
                    <div className="task-card-block__header d-flex flex-column flex-sm-row justify-content-between">
                        <h1 className="title">{title}</h1>
                        <h2 className="charge">
                            {currency ? currency?.symbol : "Rs"}{" "}
                            {task?.budget_from && `${task?.budget_from} -`}
                            {task?.budget_to}
                        </h2>
                    </div>
                    <div className="task-card-block__body">
                        <p className="task-description">
                            {parser(description)}
                        </p>
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
                                {task.created_at
                                    ? format(
                                          new Date(task.created_at),
                                          "MMMM dd, yyyy"
                                      )
                                    : ""}
                            </p>
                            <div className="d-flex align-items-center pe-4 time">
                                <FontAwesomeIcon
                                    icon={faClockEight}
                                    className="svg-icon"
                                />
                                {task.created_at
                                    ? format(new Date(task.created_at), "p")
                                    : ""}
                            </div>
                        </div>
                    </div>
                </a>
            </Link>
            <div className="task-card-block__footer d-flex flex-column flex-sm-row justify-content-between">
                <div className="left d-flex align-items-center">
                    {/* <SaveIcon
                        filled={isBookmarked}
                        object_id={tasker.user.id.toString()}
                        model={"user"}
                        onSuccess={() =>
                            queryClient.invalidateQueries(["bookmarks", "user"])
                        }
                    /> */}
                    <div className="d-flex align-items-center justify-content-around justify-content-md-between mb-3 mb-sm-0">
                        <SaveIcon
                            object_id={id}
                            model={"entityservice"}
                            filled={isTaskBookmarked}
                            onSuccess={() =>
                                queryClient.invalidateQueries([
                                    "bookmarks",
                                    "entityservice",
                                ])
                            }
                        />

                        <ShareIcon url={""} quote={""} hashtag={""} />
                    </div>
                    {/* <div className="share d-flex align-items-center">
                        <ShareIcon url={""} quote={""} hashtag={""} />
                        Share
                    </div> */}
                    <Link href={`/task/${slug}` ?? "/"}>
                        <a>
                            <p className="applicants  d-flex align-items-center">
                                <FontAwesomeIcon
                                    icon={faUserGroup}
                                    className="svg-icon"
                                />
                                {applicants_count} Applied
                            </p>
                        </a>
                    </Link>
                </div>
                <div className="right">
                    <Link href={`/task/${slug}` ?? "/"}>
                        <a>
                            <CardBtn
                                btnTitle={status ?? "open"}
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
