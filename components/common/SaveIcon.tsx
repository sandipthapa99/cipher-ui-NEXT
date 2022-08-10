import { faHeart } from "@fortawesome/pro-regular-svg-icons";
import { faHeart as FilledHeart } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const SaveIcon = () => {
    const [isSaveClicked, setIsSaveClicked] = useState(false);

    const handleSaveClick = () => {
        setIsSaveClicked(!isSaveClicked);
    };
    return (
        <FontAwesomeIcon
            icon={isSaveClicked ? FilledHeart : faHeart}
            onClick={handleSaveClick}
            className="svg-icon svg-icon-heart me-2 me-sm-5"
        />
    );
};
export default SaveIcon;
