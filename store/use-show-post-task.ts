import create from "zustand";
export interface ShowPostTaskModalStore {
    showPostTaskModal: boolean;
    toggleShowPostTaskModal: () => void;
}
export const showPostTaskModalStore = create<ShowPostTaskModalStore>((set) => ({
    showPostTaskModal: true,
    toggleShowPostTaskModal: () =>
        set((state) => ({
            ...state,
            showPostTaskModalStore: !state.showPostTaskModal,
        })),
}));

export const useShowPostTaskModal = () =>
    showPostTaskModalStore((state) => state.showPostTaskModal);

export const useToggleShowPostTaskModal = () =>
    showPostTaskModalStore((state) => state.toggleShowPostTaskModal);
