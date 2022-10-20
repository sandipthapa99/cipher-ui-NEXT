import { faHeart } from "@fortawesome/pro-regular-svg-icons";
import { faHeart as faFilledHeart } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionIcon, Button } from "@mantine/core";
import { createStyles } from "@mantine/styles";
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
    className,
}: saveIconProps) => {
    const { classes } = useStyles();
    const withLogin = useWithLogin();
    const { mutate, isLoading } = useToggleBookmarkTask();
    const handleSaveClick = () => {
        if (!object_id || !model) return;
        mutate({ object_id, model });
    };
    return showText ? (
        <Button
            color="red"
            loading={isLoading}
            variant="subtle"
            onClick={withLogin(handleSaveClick)}
            className={`${classes.saveIconContainer} ${className}`}
            leftIcon={
                <FontAwesomeIcon
                    className="svg-icon m-0"
                    icon={filled ? faFilledHeart : faHeart}
                />
            }
        >
            {showText ? <span>{filled ? "Remove" : "Save"}</span> : null}
        </Button>
    ) : (
        <ActionIcon
            color="red"
            loading={isLoading}
            variant="subtle"
            onClick={withLogin(handleSaveClick)}
            className={classes.saveIcon}
        >
            <FontAwesomeIcon
                color="red"
                icon={filled ? faFilledHeart : faHeart}
                className="svg-icon me-0"
            />
        </ActionIcon>
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
    saveIcon: {
        marginLeft: "-0.4rem",
    },
}));
export default SaveIcon;
