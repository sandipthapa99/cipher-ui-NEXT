import { ReportRevisionForm } from "@components/AppliedTask/ReportRevisionForm";
import {
    faChevronDown,
    faChevronRight,
    faCopy,
    faEllipsisVertical,
    faFlag,
    faPenToSquare,
    faTrashCan,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Text } from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import { useModals } from "@mantine/modals";
import {
    ChevronRight,
    ContentCopy,
    Delete,
    DeleteOutline,
    Edit,
    ExpandMore,
    FlagOutlined,
    MoreVert,
} from "@mui/icons-material";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteTask } from "hooks/task/use-delete-task";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useToggleShowPostTaskModal } from "store/use-show-post-task";
import { ReactQueryKeys } from "types/queryKeys";
import { toast } from "utils/toast";

interface ElipsisReportProps {
    task?: boolean;
    service?: boolean;
    taskId?: string;
    serviceId?: string;
    taskTitle?: string;
    taskDescription?: string;
    serviceTitle?: string;
    serviceDescription?: string;
    tasker?: boolean;
    taskerId?: string;
    taskerName?: string;
    taskerDescription?: string;
    owner?: boolean;
    isService?: boolean;
    // handleDelete?: () => void;
}

export const ElipsisReport = ({
    task,
    service,
    taskId,
    taskTitle,
    taskDescription,
    serviceId,
    serviceTitle,
    serviceDescription,
    tasker,
    taskerId,
    taskerName,
    taskerDescription,
    owner,
    isService,
}: // handleDelete,
ElipsisReportProps) => {
    const [moreOpen, setMoreOpen] = useState(false);
    const [reportForm, setReportForm] = useState(false);

    const handleClose = () => {
        setReportForm(false);
    };
    const modals = useModals();
    const { mutate: deleteTaskMutation } = useDeleteTask();
    const queryClient = useQueryClient();
    const router = useRouter();

    const handleDeleteTask = () => {
        if (!isService && !taskId) return;
        if (isService && !serviceId) return;

        deleteTaskMutation(
            { id: isService ? serviceId : taskId },
            {
                onSuccess: (message) => {
                    toast.success(message);
                    router.push(!isService ? "/task" : "/service");
                    !isService
                        ? queryClient.invalidateQueries([ReactQueryKeys.TASKS])
                        : queryClient.invalidateQueries([
                              ReactQueryKeys.SERVICES,
                          ]);
                },
            }
        );
    };
    const ref = useClickOutside(() => setMoreOpen(false));
    const openConfirmDeleteTaskModal = () =>
        modals.openConfirmModal({
            title: `Delete`,
            centered: true,
            labels: { confirm: `Delete`, cancel: "Cancel" },
            confirmProps: { color: "red" },
            children: (
                <Text>{`Are you sure you want to delete this ${
                    isService ? "service" : "task"
                }  ?`}</Text>
            ),
            onConfirm: handleDeleteTask,
        });

    const toggleShowPostTaskModal = useToggleShowPostTaskModal();

    return (
        <div className="ellipsis">
            <Dropdown>
                <Dropdown.Toggle>
                    <MoreVert className="svg-icon option" />
                </Dropdown.Toggle>

                {!tasker && (
                    <Dropdown.Menu>
                        <Dropdown.Item
                            href="#/action-1"
                            onClick={() => toggleShowPostTaskModal()}
                        >
                            <ContentCopy className="svg-icon" />
                            Post Similar Task
                        </Dropdown.Item>

                        {!owner && (
                            <div className="more-button" ref={ref}>
                                <li
                                    className="d-flex justify-content-between align-items-center"
                                    onClick={() => setMoreOpen(!moreOpen)}
                                >
                                    <span>More</span>
                                    {moreOpen ? (
                                        <ExpandMore className="svg-icon" />
                                    ) : (
                                        <ChevronRight className="svg-icon" />
                                    )}
                                </li>
                                {moreOpen && (
                                    <div className="items">
                                        <Dropdown.Item
                                            onClick={() => setReportForm(true)}
                                        >
                                            <FlagOutlined className="svg-icon" />
                                            Report
                                        </Dropdown.Item>
                                    </div>
                                )}
                            </div>
                        )}

                        {owner && (
                            <>
                                <Dropdown.Item
                                    onClick={() =>
                                        toggleShowPostTaskModal(
                                            taskId ? "true" : "false",
                                            taskId ?? serviceId
                                        )
                                    }
                                >
                                    <Edit className="svg-icon" />
                                    Edit
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={openConfirmDeleteTaskModal}
                                >
                                    <DeleteOutline className="svg-icon" />
                                    Remove
                                </Dropdown.Item>
                            </>
                        )}
                    </Dropdown.Menu>
                )}

                {tasker && (
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setReportForm(true)}>
                            <FlagOutlined className="svg-icon" />
                            Report
                        </Dropdown.Item>
                    </Dropdown.Menu>
                )}
            </Dropdown>

            <ReportRevisionForm
                show={reportForm}
                handleClose={handleClose}
                task={task}
                service={service}
                taskId={taskId}
                serviceId={serviceId}
                taskTitle={taskTitle}
                taskDescription={taskDescription}
                serviceTitle={serviceTitle}
                serviceDescription={serviceDescription}
                tasker={tasker}
                taskerId={taskerId}
                taskerName={taskerName}
                taskerDescription={taskerDescription}
            />
        </div>
    );
};
