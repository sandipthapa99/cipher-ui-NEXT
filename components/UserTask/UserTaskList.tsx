import TaskCard from "@components/AppliedTask/taskAppliedCard";
import type { ITask } from "types/task";

interface UserTaskListProps {
    userTasks: ITask[];
    onTaskClick?: (task: ITask) => void;
}

const UserTaskList = ({ userTasks, onTaskClick }: UserTaskListProps) => {
    const renderUserTasks = () => {
        return userTasks.map((task, index) => (
            <TaskCard onTaskClick={onTaskClick} key={index} task={task} />
        ));
    };
    return <div className="accept-task__list">{renderUserTasks()}</div>;
};
export default UserTaskList;
