import { createContext, useContext } from "react";

export interface SearchContext {
    state: string;
    setState: React.Dispatch<React.SetStateAction<string>>;
}

export const searchContext = createContext<SearchContext>({} as SearchContext);

export const useSearchContext = () => useContext(searchContext);
