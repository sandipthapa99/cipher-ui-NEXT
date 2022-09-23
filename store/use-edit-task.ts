import type { ITask } from "types/task";
import { createStore, useStore } from "zustand";

interface EditTaskStore {
    editTaskDetail?: ITask;
    setEditTaskDetail: (task?: ITask) => void;
}

const editTaskStore = createStore<EditTaskStore>((set) => ({
    editTaskDetail: undefined,
    setEditTaskDetail: (task) =>
        set((state) => ({ ...state, editTaskDetail: task })),
}));

export const useEditTaskDetail = () => useStore(editTaskStore).editTaskDetail;

export const useSetEditTaskDetail = () =>
    useStore(editTaskStore).setEditTaskDetail;
