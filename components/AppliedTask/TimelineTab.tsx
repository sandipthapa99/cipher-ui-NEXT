import BigButton from "@components/common/Button";
import { faCircleDot, faCircleSmall } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { TaskDetailTimelineData } from "staticData/taskDetailTimeline";

export const TimelineTab = () => {
    const [activeId, setActiveId] = useState<number>(1);

    return (
        <div className="timeline-tab-component">
            {TaskDetailTimelineData.map((item) => (
                <div
                    className="d-flex  each-timelines"
                    key={item?.id}
                    onClick={() => setActiveId(item?.id)}
                >
                    <div
                        className={`d-flex w-100 justify-content-between ${
                            item?.id == activeId
                                ? "for-border-div-active"
                                : "for-border-div"
                        }`}
                    >
                        <div className="d-flex point-title-button">
                            <div
                                className={`${
                                    item?.id == activeId
                                        ? "active-point"
                                        : "point"
                                }`}
                            >
                                {item?.id === activeId ? (
                                    <FontAwesomeIcon
                                        className="circle-dot"
                                        icon={faCircleDot}
                                    />
                                ) : (
                                    <FontAwesomeIcon
                                        className="circle-small"
                                        icon={faCircleSmall}
                                    />
                                )}
                            </div>

                            <div className="title-date-section">
                                <h4>{item?.task_status}</h4>
                                <h5>{item?.date}</h5>
                            </div>
                        </div>

                        {item?.id == activeId && (
                            <BigButton
                                btnTitle={"Task Completed"}
                                backgroundColor={"#211D4F"}
                                textColor={"#fff"}
                            />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};
