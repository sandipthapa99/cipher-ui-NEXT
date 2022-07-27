import { createContext, useContext } from 'react';

import {ClientSignUpValueProps}  from '../../types/clientSignUp'
export interface AuthProps {
	loginUser:(email:string,password:string)  => void 
	signUpUser:(values: ClientSignUpValueProps) => void
}

export const AuthContext = createContext<AuthProps>({} as AuthProps);

export const useAuthContext = () => useContext(AuthContext);
