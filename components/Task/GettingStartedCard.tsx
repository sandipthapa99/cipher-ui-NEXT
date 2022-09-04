import { taskActionCardContent } from "staticData/taskActionCardContent";

import TaskActionCard from "./TaskActionCard";

const GettingStartedTask = () => {
    return (
        <div className="getting-started card-block">
            <div className="top-container">
                <h1>Getting Started</h1>
                <p>10% done - great Work!</p>
            </div>
            <div className="task-container">
                {taskActionCardContent &&
                    taskActionCardContent.map((task) => (
                        <TaskActionCard
                            key={task.id}
                            title={task.title}
                            image={task.image}
                            redirection={task.redirection}
                        />
                    ))}
            </div>
        </div>
    );
};
export default GettingStartedTask;
