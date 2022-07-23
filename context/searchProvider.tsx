import { SearchContext } from './searchContext';
import { ReactNode, useState } from 'react';
interface Props {
	children: ReactNode;
}

const SearchProvider = ({ children }: Props) => {
	const [state, setState] = useState('');
	const value = {
		state,
		setState,
	};
	return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};
export default SearchProvider;
