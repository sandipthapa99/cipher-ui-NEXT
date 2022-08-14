import { createStore, useStore } from "zustand";

export interface SuccessModalStore {
    showModal: boolean;
    toggleModal: () => void;
}
export const useSuccessModal = createStore<SuccessModalStore>((set) => ({
    showModal: false,
    toggleModal: () =>
        set((state) => ({ ...state, showModal: !state.showModal })),
}));

export const useShowSuccessModal = () => useStore(useSuccessModal).showModal;
export const useToggleSuccessModal = () =>
    useStore(useSuccessModal).toggleModal;
