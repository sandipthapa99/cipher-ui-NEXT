import { faFolderOpen } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";
import { useToggleShowPostTaskModal } from "store/use-show-post-task";
import type { NoTasksProps } from "types/noTasks";

export const ApplyPostComponent = ({
    model,
    title,
    subtitle,
    buttonText,
}: NoTasksProps) => {
    const router = useRouter();
    const toggleShowPostTaskModal = useToggleShowPostTaskModal();

    const handleClick = () => {
        const navigateToService = () => router.push("/service");
        const func =
            model === "task" ? toggleShowPostTaskModal : navigateToService;
        func();
    };

    return (
        <div className="apply-post">
            <div className="folder">
                <FontAwesomeIcon icon={faFolderOpen} className="folder-icon" />
            </div>
            <div className="text-post">
                <p className="head">{title}</p>
                <p className="para">{subtitle}</p>
            </div>
            <div className="btn-cont">
                <Button
                    variant="light"
                    className="post-btn"
                    onClick={handleClick}
                >
                    {buttonText}
                </Button>
            </div>
        </div>
    );
};
