import { createStore, useStore } from "zustand";

export interface CheckModal {
    checkOffer: boolean;
    setCheckOffer: () => void;
}
export const useCheckOffer = createStore<CheckModal>((set) => ({
    checkOffer: false,
    setCheckOffer: () =>
        set((state) => ({ ...state, checkOffer: !state.checkOffer })),
}));

export const useCheckSpecialOffer = () => useStore(useCheckOffer).checkOffer;
export const useSetCheckSpecialOffer = () =>
    useStore(useCheckOffer).setCheckOffer;
