import create from "zustand";
export interface ShowPostTaskModalStore {
    showPostTaskModal: boolean;
    toggleShowPostTaskModal: () => void;
}
export const showPostTaskModalStore = create<ShowPostTaskModalStore>((set) => ({
    showPostTaskModal: false,
    toggleShowPostTaskModal: () =>
        set((state) => ({
            ...state,
            showPostTaskModal: !state.showPostTaskModal,
        })),
}));

export const useShowPostTaskModal = () =>
    showPostTaskModalStore((state) => state.showPostTaskModal);

export const useToggleShowPostTaskModal = () =>
    showPostTaskModalStore((state) => state.toggleShowPostTaskModal);
