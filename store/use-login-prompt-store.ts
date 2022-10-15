import Cookies from "js-cookie";
import { createStore, useStore } from "zustand";

type CustomFunction = (...args: any[]) => unknown;

interface LoginPromptStore {
    pausedFunction?: CustomFunction;
    showPrompt: boolean;
    hidePrompt: () => void;
    withLogin: (
        _function: CustomFunction,
        validator?: boolean,
        notLoggedInFunction?: CustomFunction
    ) => CustomFunction;
    clearPausedFunction: () => void;
    openLoginPrompt: () => void;
}

export const loginPromptStore = createStore<LoginPromptStore>((set) => {
    const showLoginPrompt = (pausedFunction: CustomFunction) => () =>
        set((state) => ({ ...state, showPrompt: true, pausedFunction }));

    return {
        pausedFunction: undefined,
        showPrompt: false,
        hidePrompt: () => set((state) => ({ ...state, showPrompt: false })),
        openLoginPrompt: () => {
            set((state) => ({ ...state, showPrompt: true }));
        },
        withLogin: (_function, validator, notLoggedInFunction) => {
            //! temporary workground untill zustand@4 releases proper docs
            const user = Cookies.get("access");
            return (validator ? validator : user)
                ? _function
                : notLoggedInFunction ?? showLoginPrompt(_function);
        },
        clearPausedFunction: () =>
            set((state) => ({ ...state, pausedFunction: undefined })),
    };
});

export const useOpenLoginPrompt = () =>
    useStore(loginPromptStore).openLoginPrompt;

export const useShowLoginPrompt = () => useStore(loginPromptStore).showPrompt;
export const useHideLoginPrompt = () => useStore(loginPromptStore).hidePrompt;
export const useWithLogin = () => useStore(loginPromptStore).withLogin;
export const useClearPausedFunction = () =>
    useStore(loginPromptStore).clearPausedFunction;
export const usePausedFunction = () =>
    useStore(loginPromptStore).pausedFunction;
