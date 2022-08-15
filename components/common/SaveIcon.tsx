import { faHeart } from "@fortawesome/pro-regular-svg-icons";
import { faHeart as FilledHeart } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useBookmark } from "hooks/bookmark/useBookmark";
import { useState } from "react";
import { toast } from "react-toastify";

interface saveIconProps {
    object_id?: any;
    model?: any;
}

const SaveIcon = ({ object_id, model }: saveIconProps) => {
    const { mutate, isLoading, data: bookmarkData } = useBookmark();

    const [isSaveClicked, setIsSaveClicked] = useState(false);
    const message = bookmarkData?.message;
    const handleSaveClick = () => {
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
        <FontAwesomeIcon
            icon={isSaveClicked ? FilledHeart : faHeart}
            onClick={handleSaveClick}
            className="svg-icon svg-icon-heart me-2 me-sm-5"
        />
    );
};
export default SaveIcon;
