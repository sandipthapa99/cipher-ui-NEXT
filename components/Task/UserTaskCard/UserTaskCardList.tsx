import { UserTaskCard } from "@components/Task/UserTaskCard/UserTaskCard";
import { Task } from "types/tasks";

export interface Props {
    tasks: Task[];
    onTaskClick: (task: Task) => void;
}
export const UserTaskCardList = ({ tasks, onTaskClick }: Props) => {
    const renderTaskList = () => {
        return tasks.map((task) => (
            <UserTaskCard
                onTaskClick={() => onTaskClick(task)}
                task={task}
                key={task.id}
                isButton={false}
            />
        ));
    };
    return (
        <div className="user-task-card-list">
            <p>{tasks.length} Tasker in Kathmandu,Bagmati Nepal (1 new)</p>
            {renderTaskList()}
        </div>
    );
};
