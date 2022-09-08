import create from "zustand";

export type ModalType = "CREATE" | "EDIT";
export interface ShowPostTaskModalStore {
    modalType: ModalType;
    showPostTaskModal: boolean;
    toggleShowPostTaskModal: (modalType?: ModalType) => void;
}
export const showPostTaskModalStore = create<ShowPostTaskModalStore>((set) => ({
    showPostTaskModal: false,
    modalType: "CREATE",
    toggleShowPostTaskModal: (newModalType) =>
        set((state) => ({
            ...state,
            showPostTaskModal: !state.showPostTaskModal,
            modalType: newModalType ?? state.modalType,
        })),
}));

export const useShowPostTaskModal = () =>
    showPostTaskModalStore((state) => state.showPostTaskModal);

export const useToggleShowPostTaskModal = () =>
    showPostTaskModalStore((state) => state.toggleShowPostTaskModal);
export const usePostTaskModalType = () =>
    showPostTaskModalStore((state) => state.modalType);
