import type { User } from "types/user";
import { createStore, useStore } from "zustand";

type UseUserStoreProps = {
    user: User | undefined;
    setUser: (detail: User | any) => void;
};

const useUserStore = createStore<UseUserStoreProps>((set) => ({
    user: undefined,
    setUser: (detail) => set((state) => ({ ...state, user: detail })),
}));

export const useUserStoreSet = () => useStore(useUserStore).setUser;
export const useUserStoreGet = () => useStore(useUserStore).user;
