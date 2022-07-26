import { createContext, useContext } from 'react';

export interface SearchContext {
	state: string;
	setState: Function;
}

export const searchContext = createContext<SearchContext>({} as SearchContext);

export const useSearchContext = () => useContext(searchContext);
