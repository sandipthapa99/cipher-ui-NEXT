import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faListCheck, faXmark } from "@fortawesome/pro-regular-svg-icons";
import BigButton from "@components/common/Button";

export const PostTaskHomepage = () => {
    return (
        <div className="post-task-homepage">
            <span>
                <FontAwesomeIcon icon={faXmark} />
            </span>
            <FontAwesomeIcon icon={faListCheck} />

            <h4>Earning is what we do</h4>
            <BigButton btnTitle={"Post Task"} backgroundColor={""} />
        </div>
    );
};
