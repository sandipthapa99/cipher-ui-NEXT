import { ReportRevisionForm } from "@components/AppliedTask/ReportRevisionForm";
import {
    faChevronDown,
    faChevronRight,
    faCopy,
    faEllipsisVertical,
    faFlag,
    faPenToSquare,
    faRepeat,
    faTrashCan,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useClickOutside } from "@mantine/hooks";
import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";

interface ElipsisReportProps {
    task?: boolean;
    service?: boolean;
    taskId?: string;
    serviceId?: string;
    taskTitle?: string;
    taskDescription?: string;
    serviceTitle?: string;
    serviceDescription?: string;
    tasker?: boolean;
    taskerId?: string;
    taskerName?: string;
    taskerDescription?: string;
    owner?: boolean;
    handleDelete?: () => void;
    handleEdit?: () => void;
}

export const ElipsisReport = ({
    task,
    service,
    taskId,
    taskTitle,
    taskDescription,
    serviceId,
    serviceTitle,
    serviceDescription,
    tasker,
    taskerId,
    taskerName,
    taskerDescription,
    owner,
    handleDelete,
    handleEdit,
}: ElipsisReportProps) => {
    const [moreOpen, setMoreOpen] = useState(false);
    const [reportForm, setReportForm] = useState(false);

    const handleClose = () => {
        setReportForm(false);
    };

    const ref = useClickOutside(() => setMoreOpen(false));

    return (
        <div className="ellipsis">
            <Dropdown>
                <Dropdown.Toggle>
                    <FontAwesomeIcon
                        icon={faEllipsisVertical}
                        className="svg-icon option"
                    />
                </Dropdown.Toggle>

                {!tasker && (
                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">
                            <FontAwesomeIcon
                                icon={faCopy}
                                className="svg-icon"
                            />
                            Post Similar Task
                        </Dropdown.Item>

                        {!owner && (
                            <div className="more-button" ref={ref}>
                                <li
                                    className="d-flex justify-content-between align-items-center"
                                    onClick={() => setMoreOpen(!moreOpen)}
                                >
                                    <span>More</span>
                                    <FontAwesomeIcon
                                        icon={
                                            moreOpen
                                                ? faChevronDown
                                                : faChevronRight
                                        }
                                        className="svg-icon"
                                    />
                                </li>
                                {moreOpen && (
                                    <div className="items">
                                        <Dropdown.Item>
                                            <FontAwesomeIcon
                                                icon={faRepeat}
                                                className="svg-icon"
                                            />
                                            Revision
                                        </Dropdown.Item>

                                        <Dropdown.Item
                                            onClick={() => setReportForm(true)}
                                        >
                                            <FontAwesomeIcon
                                                icon={faFlag}
                                                className="svg-icon"
                                            />
                                            Report
                                        </Dropdown.Item>
                                    </div>
                                )}
                            </div>
                        )}

                        {owner && (
                            <>
                                <Dropdown.Item onClick={handleEdit}>
                                    <FontAwesomeIcon
                                        icon={faPenToSquare}
                                        className="svg-icon"
                                    />
                                    Edit
                                </Dropdown.Item>
                                <Dropdown.Item onClick={handleDelete}>
                                    <FontAwesomeIcon
                                        icon={faTrashCan}
                                        className="svg-icon"
                                    />
                                    Remove
                                </Dropdown.Item>
                            </>
                        )}
                    </Dropdown.Menu>
                )}

                {tasker && (
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setReportForm(true)}>
                            <FontAwesomeIcon
                                icon={faFlag}
                                className="svg-icon"
                            />
                            Report
                        </Dropdown.Item>
                    </Dropdown.Menu>
                )}
            </Dropdown>

            <ReportRevisionForm
                show={reportForm}
                handleClose={handleClose}
                task={task}
                service={service}
                taskId={taskId}
                serviceId={serviceId}
                taskTitle={taskTitle}
                taskDescription={taskDescription}
                serviceTitle={serviceTitle}
                serviceDescription={serviceDescription}
                tasker={tasker}
                taskerId={taskerId}
                taskerName={taskerName}
                taskerDescription={taskerDescription}
            />
        </div>
    );
};
