import type { IService } from "types/service";
import type { ITasker } from "types/tasker";
import create from "zustand";

import type { SearchContext } from "./index";

export interface SearchQuery {
    context: SearchContext;
    query: string;
}
export interface SearchStore {
    searchedTaskers: ITasker[];
    setSearchedTaskers: (taskers: ITasker[]) => void;
    clearSearchedTaskers: () => void;
    searchedServices: IService[];
    setSearchedServices: (services: IService[]) => void;
    clearSearchedServices: () => void;
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
    searchedServices: [],
    setSearchedServices: (services) =>
        set((state) => ({ ...state, searchedServices: services })),
    clearSearchedServices: () =>
        set((state) => ({ ...state, searchedServices: [] })),
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

export const useSearchedServices = () =>
    searchStore((state) => state.searchedServices);
export const useSetSearchedServices = () =>
    searchStore((state) => state.setSearchedServices);
export const useClearSearchedServices = () =>
    searchStore((state) => state.clearSearchedServices);

export const useSearchQuery = () => searchStore((state) => state.query);
export const useSetSearchQuery = () => searchStore((state) => state.setQuery);
export const useClearSearchQuery = () =>
    searchStore((state) => state.clearSearchQuery);

searchStore.subscribe((state) => {
    const { searchedServices } = state;
    console.log(
        "🚀 ~ file: searchStore.ts ~ line 59 ~ searchStore.subscribe ~ searchedServices",
        searchedServices
    );
});
