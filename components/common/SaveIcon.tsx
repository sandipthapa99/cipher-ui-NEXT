import { faHeart } from "@fortawesome/pro-regular-svg-icons";
import { faHeart as FilledHeart } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useToggleBookmarkTask } from "hooks/task/use-toggle-bookmark-task";
import { useState } from "react";
import { toast } from "react-toastify";

interface saveIconProps {
    object_id?: string;
    model?: string;
}

const SaveIcon = ({ object_id, model }: saveIconProps) => {
    const { mutate, data: bookmarkData } = useToggleBookmarkTask();

    const [isSaveClicked, setIsSaveClicked] = useState(false);
    const message = bookmarkData?.message;

    const handleSaveClick = () => {
        if (!object_id || !model) return;
        setIsSaveClicked(!isSaveClicked);
        mutate(
            { object_id, model },
            {
                onSuccess: async () => {
                    toast.success(message);
                },
            }
        );
    };
    return (
        <button className="btn">
            <FontAwesomeIcon
                icon={isSaveClicked ? FilledHeart : faHeart}
                onClick={handleSaveClick}
                className="svg-icon svg-icon-heart me-2 me-sm-5"
            />
        </button>
    );
};
export default SaveIcon;
