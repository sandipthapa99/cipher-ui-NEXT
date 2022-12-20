import {
    faClock,
    faLocation,
    faShare,
    faUser,
} from "@fortawesome/pro-regular-svg-icons";
import { faCalendar } from "@fortawesome/pro-thin-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import type { PostTaskProps } from "types/postTaskData";

interface Props {
    task: PostTaskProps;
}
export const ClientTaskCard = ({ task }: Props) => {
    return (
        <div className="client-task">
            <h4 className="client-task__header">
                <span className="client-task__header--title">{task.title}</span>
                <span className="client-task__header--charge">
                    {`$${task.maxBudget ?? task.budget}/hr`}
                </span>
            </h4>
            <p className="client-task__description">{task.description}</p>
            <div className="client-task__info">
                <div className="icon-text">
                    <FontAwesomeIcon
                        color="#FE5050"
                        className="svg-icon"
                        icon={faLocation}
                    />
                    <span>Anamnagar, Baneshor Kathamandu Nepal(10km)</span>
                </div>
                <div className="icon-text">
                    <FontAwesomeIcon
                        color="#F06700"
                        className="svg-icon"
                        icon={faCalendar}
                    />
                    {task.date && (
                        <span>{new Date(task.date).toLocaleDateString()}</span>
                    )}
                </div>
                <div className="icon-text">
                    <FontAwesomeIcon
                        color="#3EAEFF"
                        className="svg-icon"
                        icon={faClock}
                    />
                    <span>08:11PM</span>
                </div>
            </div>
            <span className="divider"></span>
            <div className="client-task__footer">
                <div className="client-task__footer--icons">
                    <div className="icon-text">
                        <FontAwesomeIcon
                            color="#3EAEFF"
                            className="svg-icon"
                            icon={faShare}
                        />
                        <span>Share</span>
                    </div>
                    <div className="icon-text">
                        <FontAwesomeIcon
                            color="#2D2D66"
                            className="svg-icon"
                            icon={faUser}
                        />
                        <span>100 Applied</span>
                    </div>
                </div>
                <button className="client-task__footer--btn">Published</button>
            </div>
        </div>
    );
};
