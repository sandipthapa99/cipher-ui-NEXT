import { taskActionCardContent } from "staticData/taskActionCardContent";
import { useToggleShowPostTaskModal } from "store/use-show-post-task";

import { PostTaskModal } from "./PostTaskModal";
import TaskActionCard from "./TaskActionCard";

const GettingStartedTask = () => {
    const toggleShowPostTaskModal = useToggleShowPostTaskModal();
    return (
        <div className="getting-started card-block">
            <div className="top-container">
                <h1>Getting Started</h1>
                <p>Get most out of the Homaale</p>
            </div>
            <div className="task-container">
                {taskActionCardContent &&
                    taskActionCardContent.map((task) => (
                        <div
                            key={task.id}
                            onClick={() => toggleShowPostTaskModal()}
                        >
                            <TaskActionCard
                                title={task.title}
                                image={task.image}
                                // redirection={task.redirection}
                                redirection={""}
                            />
                        </div>
                    ))}
            </div>
            <PostTaskModal />
        </div>
    );
};
export default GettingStartedTask;
