import '../styles/bundle.scss';

import SearchProvider from 'context/searchProvider';
// import { useEffect } from 'react';
// import { useLocalStorage } from 'hooks/use-local-storage';
import AuthProvider from '../context/AuthContext/userContextProvider'
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
		<AuthProvider>
			<SearchProvider>
				<SuccessProvider>
				<Component {...pageProps} />
				</SuccessProvider>
			</SearchProvider>
		</AuthProvider>
	);
}

export default MyApp;
