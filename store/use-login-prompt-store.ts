import Cookies from "js-cookie";
import { createStore, useStore } from "zustand";

type CustomFunction = () => void;

interface LoginPromptStore {
    pausedFunction?: any;
    showPrompt: boolean;
    hidePrompt: () => void;
    withLogin: (
        _function: CustomFunction,
        notLoggedInFunction?: CustomFunction
    ) => CustomFunction;
    clearPausedFunction: () => void;
}

export const loginPromptStore = createStore<LoginPromptStore>((set) => {
    const showLoginPrompt = () =>
        set((state) => ({ ...state, showPrompt: true }));

    return {
        pausedFunction: undefined,
        showPrompt: false,
        hidePrompt: () => set((state) => ({ ...state, showPrompt: false })),
        withLogin: (_function, notLoggedInFunction) => {
            //! temporary workground untill zustand@4 releases proper docs
            const user = Cookies.get("access");
            if (!user) {
                set((state) => ({ ...state, pausedFunction: _function }));
            }
            return user ? _function : notLoggedInFunction ?? showLoginPrompt;
        },
        clearPausedFunction: () =>
            set((state) => ({ ...state, pausedFunction: undefined })),
    };
});
export const useShowLoginPrompt = () => useStore(loginPromptStore).showPrompt;
export const useHideLoginPrompt = () => useStore(loginPromptStore).hidePrompt;
export const useWithLogin = () => useStore(loginPromptStore).withLogin;
export const usePausedFunction = () =>
    useStore(loginPromptStore).pausedFunction;
export const useClearPausedFunction = () =>
    useStore(loginPromptStore).clearPausedFunction;
