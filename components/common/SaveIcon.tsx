import { ActionIcon, Button } from "@mantine/core";
import { createStyles } from "@mantine/styles";
import { Bookmark, BookmarkBorderOutlined } from "@mui/icons-material";
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
                filled ? (
                    <Bookmark className="svg-icon m-0" />
                ) : (
                    <BookmarkBorderOutlined className="svg-icon m-0" />
                )
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
            {filled ? (
                <Bookmark className="svg-icon me-0" style={{ color: "red" }} />
            ) : (
                <BookmarkBorderOutlined
                    className="svg-icon me-0"
                    style={{ color: "red" }}
                />
            )}
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
