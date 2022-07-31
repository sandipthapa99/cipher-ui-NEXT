import TaskCard from "@components/AppliedTask/taskAppliedCard";
import { UserTask } from "staticData/userTasks";

interface UserTaskListProps {
    userTasks: UserTask[];
    onTaskClick?: (task: UserTask) => void;
}

const UserTaskList = ({ userTasks, onTaskClick }: UserTaskListProps) => {
    const renderUserTasks = () => {
        return userTasks.map((task, index) => (
            <TaskCard
                onClick={() => onTaskClick?.(task)}
                key={index}
                {...task}
            />
        ));
    };
    return <>{renderUserTasks()}</>;
};
export default UserTaskList;
