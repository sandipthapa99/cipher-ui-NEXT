import type { Tasker } from "hooks/tasker/use-tasker";
import create from "zustand";

import type { SearchContext } from "./index";

export interface SearchQuery {
    context: SearchContext;
    query: string;
}
export interface SearchStore {
    searchedTaskers: Tasker[];
    setSearchedTaskers: (taskers: Tasker[]) => void;
    clearSearchedTaskers: () => void;
    query?: SearchQuery;
    setQuery: (query: SearchQuery) => void;
    clearSearchQuery: () => void;
}
export const searchStore = create<SearchStore>((set) => ({
    searchedTaskers: [],
    setSearchedTaskers: (taskers) =>
        set((state) => ({ ...state, searchedTaskers: taskers })),
    clearSearchedTaskers: () =>
        set((state) => ({ ...state, searchedTaskers: [] })),
    query: undefined,
    setQuery: (query) => set((state) => ({ ...state, query })),
    clearSearchQuery: () => set((state) => ({ ...state, query: undefined })),
}));
export const useSearchedTaskers = () =>
    searchStore((state) => state.searchedTaskers);
export const useSetSearchedTaskers = () =>
    searchStore((state) => state.setSearchedTaskers);
export const useClearSearchedTaskers = () =>
    searchStore((state) => state.clearSearchedTaskers);

export const useSearchQuery = () => searchStore((state) => state.query);
export const useSetSearchQuery = () => searchStore((state) => state.setQuery);
export const useClearSearchQuery = () =>
    searchStore((state) => state.clearSearchQuery);
