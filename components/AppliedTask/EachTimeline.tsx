import BigButton from "@components/common/Button";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import { faCircleDot, faCircleSmall } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Formik } from "formik";
import type { Dispatch, SetStateAction } from "react";
import React, { useEffect, useState } from "react";

import { ReportRevisionForm } from "./ReportRevisionForm";

interface EachTimelineProps {
    id: number;
    task_status: string;
    date: string;
    buttonName: string;
    activeId: number;
    setActiveId: (id: number) => void;
    isGivingRevision?: boolean;
    handleRevisionOpen?: () => void;
    setIsGivingRevision: Dispatch<SetStateAction<boolean>>;
}

export const EachTimeline = ({
    id,
    task_status,
    date,
    buttonName,
    activeId,
    setActiveId,
    isGivingRevision,
    handleRevisionOpen,
    setIsGivingRevision,
}: EachTimelineProps) => {
    const [show, setShow] = useState(false);
    const [isActive, setisActive] = useState(false);
    const [revisionText, setRevisionText] = useState("");
    const [timelineRequested, setTimelineRequested] = useState(false);

    useEffect(() => {
        if (id === activeId) {
            setisActive(true);
        } else {
            setisActive(false);
        }
    }, [id, activeId]);

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

    const handleRequestClick = () => {
        setIsGivingRevision(true);
        setTimelineRequested(true);
    };

    const handleCancelClick = () => {
        setIsGivingRevision(false);
        setTimelineRequested(false);
    };

    const handleFormRequest = () => {
        setIsGivingRevision(true);
        setShow(false);
    };

    const handleDeleteButton = () => {
        setIsGivingRevision(false);
        setTimelineRequested(false);
    };

    const initialValues = {
        revision_reason: "",
    };
    return (
        <div
            className="each-timelines"
            key={id}
            onClick={() => setActiveId(id)}
        >
            <div
                className={` w-100 justify-content-between ${
                    id == activeId ? "for-border-div-active" : "for-border-div"
                }`}
            >
                <div className="d-flex justify-content-between upper-wrapper">
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

                    {isActive && !isGivingRevision && !timelineRequested && (
                        <BigButton
                            btnTitle={buttonName}
                            backgroundColor={"#211D4F"}
                            textColor={"#fff"}
                            handleClick={handleButtonClick}
                        />
                    )}

                    {isActive && isGivingRevision && timelineRequested && (
                        <div className="d-flex edit-delete-button">
                            <BigButton
                                btnTitle="delete"
                                backgroundColor="#fff"
                                textColor="#211D4F"
                                handleClick={handleDeleteButton}
                            />

                            <span>
                                <BigButton
                                    btnTitle="Edit"
                                    backgroundColor="#211D4F"
                                    textColor="#fff"
                                />
                            </span>
                        </div>
                    )}
                </div>
                {isActive && isGivingRevision && !timelineRequested && (
                    <div className="revision-reason-section">
                        <Formik
                            initialValues={initialValues}
                            onSubmit={async (values) => {
                                console.log(values);
                                setRevisionText(values?.revision_reason);
                            }}
                        >
                            {({ setFieldValue, errors }) => {
                                return (
                                    <Form>
                                        <InputField
                                            name="revision_reason"
                                            labelName="Revision Reason"
                                            placeHolder="Write revision reason here."
                                            as="textarea"
                                        />

                                        <div className="d-flex justify-content-end button-section">
                                            <span className="cancel-button">
                                                <FormButton
                                                    name={"Cancel"}
                                                    handleClick={
                                                        handleCancelClick
                                                    }
                                                />
                                            </span>
                                            <FormButton
                                                handleClick={handleRequestClick}
                                                name={"Request"}
                                            />
                                        </div>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </div>
                )}

                {isActive && isGivingRevision && timelineRequested && (
                    <p>{revisionText}</p>
                )}
            </div>
            <ReportRevisionForm
                show={show}
                handleClose={handleClose}
                handleButtonClick={handleFormRequest}
                setRevisionText={setRevisionText}
            />
        </div>
    );
};
