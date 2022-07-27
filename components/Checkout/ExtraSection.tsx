import AnchorButton from "@components/common/AnchorButton";
import { faCircleQuestion } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import EquipmentForm from "./EquipmentForm";
import ServiceForm from "./ServiceForm";

const ExtraSection = () => {
    const [showServForm, setshowServForm] = useState(false)
    const [showEqpForm, setshowEqpForm] = useState(false)
    return (
        <div className="extra mt-5">
                {!showServForm ? 
                <div className="extra-service">
                    <h2>Extra Service</h2>
                    <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between extra-service__desc">
                        <FontAwesomeIcon
                            icon={faCircleQuestion}
                            className="svg-icon-question-circle"
                        />
                        <span>
                            Amet minim mollit non deserunt ullamco est sit aliqua
                            dolor do amet sint. Velit officia consequat duis enim
                            velit mollit. Exercitation veniam consequat sunt nostrud
                            amet.
                        </span>

                        <button
                            className={"btn w-25 text-center align-items-center"}
                            onClick= {()=> setshowServForm(true)}
                        >
                            Add
                        </button>
                    </div>
                </div>:<ServiceForm/>}
                
                {!showEqpForm ? 
                <div className="extra-service mt-5">
                    <h2>Extra Service</h2>
                    <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between extra-service__desc">
                        <FontAwesomeIcon
                            icon={faCircleQuestion}
                            className="svg-icon-question-circle"
                        />
                        <span>
                            Amet minim mollit non deserunt ullamco est sit aliqua
                            dolor do amet sint. Velit officia consequat duis enim
                            velit mollit. Exercitation veniam consequat sunt nostrud
                            amet.
                        </span>

                        <button
                            className={"btn w-25 text-center align-items-center"}
                            onClick= {()=> setshowEqpForm(true)}
                        >
                            Add
                        </button>
                    </div>
                </div>:<EquipmentForm/>}
        </div>
    );
};

export default ExtraSection;
