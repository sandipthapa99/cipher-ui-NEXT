import BigButton from "@components/common/Button";
import { faListCheck, faXmark } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useWithLogin } from "store/use-login-prompt-store";
import { useToggleShowPostTaskModal } from "store/use-show-post-task";

interface PostTaskHomepageProps {
    handleClose: () => void;
}

export const PostTaskHomepage = ({ handleClose }: PostTaskHomepageProps) => {
    const withLogin = useWithLogin();
    const toggleShowPostTaskModal = useToggleShowPostTaskModal();
    return (
        <div className="d-flex flex-column justify-content-center align-items-center post-task-homepage">
            <span className="xmark" onClick={handleClose}>
                <FontAwesomeIcon icon={faXmark} />
            </span>
            <FontAwesomeIcon icon={faListCheck} />

            <h4 className="justify-text-center">Ease your workload</h4>
            <BigButton
                btnTitle={"Post-Task"}
                backgroundColor={"#FFCA6A"}
                handleClick={withLogin(toggleShowPostTaskModal)}
            />
        </div>
    );
};
