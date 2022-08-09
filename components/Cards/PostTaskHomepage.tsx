import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faListCheck, faXmark } from "@fortawesome/pro-regular-svg-icons";
import BigButton from "@components/common/Button";
import CardBtn from "@components/common/CardBtn";

interface PostTaskHomepageProps {
    handleClose: () => void;
}

export const PostTaskHomepage = ({ handleClose }: PostTaskHomepageProps) => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center post-task-homepage">
            <span className="xmark" onClick={handleClose}>
                <FontAwesomeIcon icon={faXmark} />
            </span>
            <FontAwesomeIcon icon={faListCheck} />

            <h4 className="justify-text-center">Earning is what we do</h4>
            <BigButton btnTitle={"Post-Task"} backgroundColor={"#FFCA6A"} />
        </div>
    );
};
