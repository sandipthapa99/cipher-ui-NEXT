import { createStore, useStore } from "zustand";

export interface SuccessModalStore {
    message: string;
    showModal: boolean;
    toggleModal: (message?: string) => void;
}
export const useSuccessModal = createStore<SuccessModalStore>((set) => ({
    message: "You are good to continue",
    showModal: false,
    toggleModal: (message) =>
        set((state) => ({
            ...state,
            message: message ?? state.message,
            showModal: !state.showModal,
        })),
}));

export const useShowSuccessModalMessage = () =>
    useStore(useSuccessModal).message;
export const useShowSuccessModal = () => useStore(useSuccessModal).showModal;
export const useToggleSuccessModal = () =>
    useStore(useSuccessModal).toggleModal;
