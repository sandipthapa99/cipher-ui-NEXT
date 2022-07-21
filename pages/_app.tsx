import '../styles/bundle.scss';
import type { AppProps } from 'next/app';
// import { useEffect } from 'react';
// import { useLocalStorage } from 'hooks/use-local-storage';
import UserProvider from 'context/userContextProvider';
import SearchProvider from 'context/searchProvider';

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
				<Component {...pageProps} />
			</SearchProvider>
		</UserProvider>
	);
}

export default MyApp;
