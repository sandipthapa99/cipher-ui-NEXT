import AppliedForm from "@components/AppliedTask/AppliedForm";
import {
    faCalendar,
    faClockEight,
    faLocationDot,
    faShare,
    faUserGroup,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { BookingDetails } from "staticData/bookNowModalCard";
import type { TaskCardProps } from "types/taskCard";

import CardBtn from "./CardBtn";
import ShareIcon from "./ShareIcon";
// css for this file is done in _gettingStartedTask.scss page
const TaskCard = ({
    title,
    charge,
    description,
    location,
    date,
    time,
    isCompleted,
    isRunning,
}: TaskCardProps) => {
    const [showModal, setShowModal] = useState(false);
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
                        <ShareIcon />
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
                <div className="right">
                    {isCompleted || isRunning ? (
                        <CardBtn
                            btnTitle={isCompleted ? "Completed" : "Running"}
                            backgroundColor={
                                isCompleted ? "#FE5050" : "#0693E3"
                            }
                        />
                    ) : (
                        <CardBtn
                            btnTitle={"Apply"}
                            backgroundColor="#38C675"
                            handleClick={() => setShowModal(true)}
                        />
                    )}
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
