import type { BookNowDetails } from "types/serviceNearYouCard";
import { createStore, useStore } from "zustand";

export interface BookNowStore {
    bookNowDetails: BookNowDetails | undefined;
    setBookNowDetails: (detail: BookNowDetails) => void;
}
export const bookNowStore = createStore<BookNowStore>((set) => ({
    bookNowDetails: undefined,
    setBookNowDetails: (detail) =>
        set((state) => ({ ...state, bookNowDetails: detail })),
}));

export const useBookNowDetails = () => useStore(bookNowStore).bookNowDetails;
export const useSetBookNowDetails = () =>
    useStore(bookNowStore).setBookNowDetails;
