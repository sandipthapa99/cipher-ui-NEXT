import BigButton from "@components/common/Button";
import { faCircleDot, faCircleSmall } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { ReportRevisionForm } from "./ReportRevisionForm";

interface EachTimelineProps {
    id: number;
    task_status: string;
    date: string;
    buttonName: string;
    activeId: number;
    setActiveId: Function;
}

export const EachTimeline = ({
    id,
    task_status,
    date,
    buttonName,
    activeId,
    setActiveId,
}: EachTimelineProps) => {
    const [show, setShow] = useState(false);

    const handleButtonClick = () => {
        if (buttonName == "Request for revision") {
            setShow(true);
        } else {
            return;
        }
    };

    const handleClose = () => {
        setShow(false);
    };
    return (
        <div
            className="d-flex  each-timelines"
            key={id}
            onClick={() => setActiveId(id)}
        >
            <div
                className={`d-flex w-100 justify-content-between ${
                    id == activeId ? "for-border-div-active" : "for-border-div"
                }`}
            >
                <div className="d-flex point-title-button">
                    <div
                        className={`${
                            id == activeId ? "active-point" : "point"
                        }`}
                    >
                        {id === activeId ? (
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
                        <h4>{task_status}</h4>
                        <h5>{date}</h5>
                    </div>
                </div>

                {id == activeId && (
                    <BigButton
                        btnTitle={buttonName}
                        backgroundColor={"#211D4F"}
                        textColor={"#fff"}
                        handleClick={handleButtonClick}
                    />
                )}
            </div>
            <ReportRevisionForm show={show} handleClose={handleClose} />
        </div>
    );
};
