import Cookies from "js-cookie";
import { createStore, useStore } from "zustand";

type CustomFunction = () => void;

interface LoginPromptStore {
    showPrompt: boolean;
    hidePrompt: () => void;
    withLogin: (_function: CustomFunction) => CustomFunction;
}

export const loginPromptStore = createStore<LoginPromptStore>((set) => {
    const showLoginPrompt = () =>
        set((state) => ({ ...state, showPrompt: true }));

    return {
        showPrompt: false,
        hidePrompt: () => set((state) => ({ ...state, showPrompt: false })),
        withLogin: (_function) => {
            //! temporary workground untill zustand@4 releases proper docs
            const user = Cookies.get("access");
            return user ? _function : showLoginPrompt;
        },
    };
});
export const useShowLoginPrompt = () => useStore(loginPromptStore).showPrompt;
export const useHideLoginPrompt = () => useStore(loginPromptStore).hidePrompt;
export const useWithLogin = () => useStore(loginPromptStore).withLogin;
