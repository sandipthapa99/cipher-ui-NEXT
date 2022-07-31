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
                key={index}
                onClick={() => onTaskClick?.(task)}
                charge={task.charge}
                date={task.date}
                location={task.location}
                time={task.time}
                title={task.title}
            />
        ));
    };
    return <div className="accept-task__list">{renderUserTasks()}</div>;
};
export default UserTaskList;
