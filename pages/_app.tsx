import '../styles/bundle.scss';

import SearchProvider from 'context/searchProvider';
// import { useEffect } from 'react';
// import { useLocalStorage } from 'hooks/use-local-storage';
import UserProvider from 'context/userContextProvider';
import type { AppProps } from 'next/app';
import SuccessProvider from 'context/successContext/successProvider';

function MyApp({ Component, pageProps }: AppProps) {
	// const [, setValue] = useLocalStorage<any[]>('users', []);

	// useEffect(() => {
	// 	if (typeof window !== 'undefined' && !localStorage.getItem('users')) {
	// 		setValue([{ email: 'test@test.com', password: 'test@test.com' }]);
	// 	}
	// }, [setValue]);
	return (
		<UserProvider>
			<SearchProvider>
				<SuccessProvider>
				<Component {...pageProps} />
				</SuccessProvider>
			</SearchProvider>
		</UserProvider>
	);
}

export default MyApp;
