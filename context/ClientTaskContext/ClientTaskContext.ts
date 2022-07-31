import { createContext, useContext } from "react";
import { PostTaskData } from "types/postTaskData";

export interface ClientTaskContextProps {
    tasks: PostTaskData[];
    addTask: (task: PostTaskData, onSuccess?: () => void) => void;
}

export const ClientTaskContext = createContext<ClientTaskContextProps>(
    {} as ClientTaskContextProps
);

export const useClientTasks = () => useContext(ClientTaskContext);
