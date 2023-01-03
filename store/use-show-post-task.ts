import create from "zustand";

export type serviceType = "false" | "true";
export interface ShowPostTaskModalStore {
    serviceType?: serviceType | null;
    id?: string;
    showPostTaskModal: boolean;
    toggleShowPostTaskModal: (
        serviceType?: serviceType,
        newId?: string
    ) => void;
    clearPostTaskserviceType: () => void;
}
export const showPostTaskModalStore = create<ShowPostTaskModalStore>((set) => ({
    showPostTaskModal: false,
    serviceType: null,
    id: "",
    toggleShowPostTaskModal: (newServiceType, newId) =>
        set((state) => ({
            ...state,
            showPostTaskModal: !state.showPostTaskModal,
            serviceType: newServiceType ?? state.serviceType,
            id: newId,
        })),
    clearPostTaskserviceType: () =>
        set((state) => ({ ...state, serviceType: undefined })),
}));

export const useShowPostTaskModal = () =>
    showPostTaskModalStore((state) => state.showPostTaskModal);

export const useToggleShowPostTaskModal = () =>
    showPostTaskModalStore((state) => state.toggleShowPostTaskModal);
export const usePostTaskserviceType = () =>
    showPostTaskModalStore((state) => state.serviceType);
export const usePostTaskserviceId = () =>
    showPostTaskModalStore((state) => state.id);

export const useClearPostTaskserviceType = () =>
    showPostTaskModalStore((state) => state.clearPostTaskserviceType);
