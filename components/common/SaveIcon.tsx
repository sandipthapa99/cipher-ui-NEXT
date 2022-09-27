import { faHeart } from "@fortawesome/pro-regular-svg-icons";
import { faHeart as FilledHeart } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createStyles } from "@mantine/styles";
import { useQueryClient } from "@tanstack/react-query";
import { useToggleBookmarkTask } from "hooks/task/use-toggle-bookmark-task";
import { useWithLogin } from "store/use-login-prompt-store";

interface saveIconProps {
    object_id: string;
    model: string;
    filled?: boolean;
    showText?: boolean;
    onSuccess?: () => void;
    className?: string;
}

const SaveIcon = ({
    object_id,
    model,
    filled,
    showText,
    onSuccess,
    className,
}: saveIconProps) => {
    const { classes } = useStyles();
    const withLogin = useWithLogin();
    const { mutate, isLoading } = useToggleBookmarkTask();
    const queryClient = useQueryClient();
    const handleSaveClick = () => {
        if (!object_id || !model) return;
        mutate({ object_id, model });
    };
    return (
        <button
            onClick={withLogin(handleSaveClick)}
            className={`${classes.saveIconContainer} ${className}`}
        >
            <FontAwesomeIcon
                icon={filled ? FilledHeart : faHeart}
                className="svg-icon svg-icon-heart me-2 me-sm-5"
            />
            {showText ? (
                isLoading ? (
                    <span>Loading</span>
                ) : (
                    <span>{filled ? "Remove" : "Save"}</span>
                )
            ) : null}
        </button>
    );
};
const useStyles = createStyles(() => ({
    saveIconContainer: {
        display: "flex",
        alignItems: "center",
        border: "none",
        outline: "none",
        backgroundColor: "transparent",
        transition: "all 0.3s ease",

        "&:hover > svg": {
            transform: "scale(1.1)",
        },
    },
}));
export default SaveIcon;
