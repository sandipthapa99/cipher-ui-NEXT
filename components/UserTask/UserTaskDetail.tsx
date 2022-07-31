import { UserTask } from "staticData/userTasks";

interface UserTaskDetailProps {
    task: UserTask;
}
export const UserTaskDetail = ({ task }: UserTaskDetailProps) => {
    return (
        <div className="user-task-detail">
            <h4 className="user-task-detail--title">{task.title}</h4>
        </div>
    );
};
