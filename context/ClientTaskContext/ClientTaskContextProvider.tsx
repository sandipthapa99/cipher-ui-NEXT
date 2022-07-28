import { useLocalStorage } from "hooks/use-local-storage";
import { ReactNode } from "react";
import { PostTaskData } from "types/postTaskData";

import { ClientTaskContext, ClientTaskContextProps } from "./ClientTaskContext";

interface Props {
    children: ReactNode;
}
export const ClientTaskContextProvider = ({ children }: Props) => {
    const [tasks, setTasks] = useLocalStorage<PostTaskData[]>(
        "client-tasks",
        []
    );

    const addTask = (task: PostTaskData, onSuccess?: () => void) => {
        setTasks((currentTasks) => [task, ...currentTasks]);
        onSuccess?.();
    };

    const value: ClientTaskContextProps = {
        tasks,
        addTask,
    };
    return (
        <ClientTaskContext.Provider value={value}>
            {children}
        </ClientTaskContext.Provider>
    );
};
