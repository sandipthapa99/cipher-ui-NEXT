import AppliedForm from "@components/AppliedTask/AppliedForm";
import {
    faCalendar,
    faClockEight,
    faLocationDot,
    faUserGroup,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { useState } from "react";
import { BookingDetails } from "staticData/bookNowModalCard";
import type { RecommendedTaskCardProps } from "types/taskCard";

import CardBtn from "./CardBtn";
import ShareIcon from "./ShareIcon";
// css for this file is done in _gettingStartedTask.scss page

const TaskCard = ({
    title,
    charge,
    description,
    location,
    start_date,
    start_time,
    status,
    currency,
}: RecommendedTaskCardProps) => {
    const [showModal, setShowModal] = useState(false);

    const starttime = start_time.split(":");

    function getDateFromHours(time: any) {
        time = time?.split(":");
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
        <div className="task-card-block">
            <div className="task-card-block__header d-flex flex-column flex-sm-row justify-content-between">
                <h1 className="title">{title}</h1>
                <h1 className="charge">
                    {currency ? currency : "Rs"} {charge}
                </h1>
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
                        {format(new Date(start_date), "MMMM dd, yyyy")}
                    </p>
                    <div className="d-flex align-items-center time">
                        <FontAwesomeIcon
                            icon={faClockEight}
                            className="svg-icon"
                        />
                        {format(new Date(formattedtime), "hh:mm")}&nbsp;
                        {parseInt(starttime[1]) > 12 ? "PM" : "AM"}
                    </div>
                </div>
            </div>
            <div className="task-card-block__footer d-flex flex-column flex-sm-row justify-content-between">
                <div className="left d-flex align-items-center">
                    <div className="share d-flex align-items-center">
                        <ShareIcon url={""} quote={""} hashtag={""} />
                        Share
                    </div>
                    <p className="applicants  d-flex align-items-center">
                        <FontAwesomeIcon
                            icon={faUserGroup}
                            className="svg-icon"
                        />
                        100 Applied
                    </p>
                </div>
                <div className="right">
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
                </div>
            </div>

            {BookingDetails &&
                BookingDetails.map((detail) => (
                    <AppliedForm
                        key={detail.id}
                        title={detail.title}
                        price={detail.price}
                        image={detail.image}
                        description={detail.description}
                        show={showModal}
                        handleClose={() => setShowModal(false)}
                    />
                ))}
        </div>
    );
};
export default TaskCard;
