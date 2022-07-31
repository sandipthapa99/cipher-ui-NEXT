import { UserTask } from "staticData/userTasks";

interface UserTaskDetailProps {
    task: UserTask;
}
export const UserTaskDetail = ({ task }: UserTaskDetailProps) => {
    return <div className="accept-task__detail">{task.title}</div>;
};
