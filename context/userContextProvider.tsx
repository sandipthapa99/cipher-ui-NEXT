import { useLocalStorage } from 'hooks/use-local-storage';
import { ReactNode, useState } from 'react';
import { LoginProps, UserContext } from './userContext';

interface Props {
	children: ReactNode;
}
const UserProvider = ({ children }: Props) => {
	const [token] = useLocalStorage<string>('token', '');

	const value: LoginProps = {
		userToken:token,
		isUserLoggedIn: token ? true : false,
	};

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
export default UserProvider;
