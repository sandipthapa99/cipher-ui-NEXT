import { ReportRevisionForm } from "@components/AppliedTask/ReportRevisionForm";
import {
    faChevronDown,
    faChevronRight,
    faCopy,
    faEllipsisVertical,
    faFlag,
    faRepeat,
    faTrashCan,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";

export const ElipsisReport = () => {
    const [moreOpen, setMoreOpen] = useState(false);
    const [reportForm, setReportForm] = useState(true);

    console.log("report form", reportForm);

    const handleClose = () => {
        setReportForm(false);
    };
    return (
        <div className="ellipsis">
            <Dropdown>
                <Dropdown.Toggle>
                    <FontAwesomeIcon
                        icon={faEllipsisVertical}
                        className="svg-icon option"
                    />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">
                        <FontAwesomeIcon icon={faCopy} className="svg-icon" />
                        Post Similar Task
                    </Dropdown.Item>

                    <div className="more-button">
                        <li
                            className="d-flex justify-content-between align-items-center"
                            onClick={() => setMoreOpen(!moreOpen)}
                        >
                            <span>More</span>
                            <FontAwesomeIcon
                                icon={moreOpen ? faChevronDown : faChevronRight}
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
                    <Dropdown.Divider />
                    <Dropdown.Item href="#/action-3">
                        <FontAwesomeIcon
                            icon={faTrashCan}
                            className="svg-icon"
                        />
                        Remove
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <ReportRevisionForm show={reportForm} handleClose={handleClose} />
        </div>
    );
};
