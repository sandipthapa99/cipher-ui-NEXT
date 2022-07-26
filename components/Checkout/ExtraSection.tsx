import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/pro-regular-svg-icons";
import React from "react";
import AnchorButton from "@components/common/AnchorButton";

const ExtraSection = () => {
    return (
        <div className="extra">
            <div className="extra-service">
                <h2>Extra Service</h2>
                <div className="d-flex justify-content-between extra-service__desc">
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

                    <AnchorButton
                        className={"w-25 text-center align-items-center"}
                        href={""}
                        varient={""}
                    >
                        Add
                    </AnchorButton>
                </div>
            </div>
            <div className="extra-service">
                <h2>Equipment Charge</h2>
                <div className="d-flex justify-content-between extra-service__desc">
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

                    <AnchorButton
                        className={"w-25 text-center align-items-center"}
                        href={""}
                        varient={""}
                    >
                        Add
                    </AnchorButton>
                </div>
            </div>
        </div>
    );
};

export default ExtraSection;
