import { faHeart } from "@fortawesome/pro-regular-svg-icons";
import { faHeart as FilledHeart } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useBookmark } from "hooks/bookmark/useBookmark";
import { useState } from "react";
import { toast } from "react-toastify";

interface SaveIconProps {
    isSaveClicked: boolean;
    onSubmit: () => void;
}

const SaveIcon = ({ isSaveClicked, onSubmit }: SaveIconProps) => {
    return (
        <FontAwesomeIcon
            icon={isSaveClicked ? FilledHeart : faHeart}
            onClick={onSubmit}
            className="svg-icon svg-icon-heart me-2 me-sm-5"
        />
    );
};
export default SaveIcon;
