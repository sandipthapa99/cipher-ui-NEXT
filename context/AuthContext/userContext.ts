import { createContext, useContext } from "react";
import { LoginValuesProps } from "types/login";

import { ClientSignUpValueProps } from "../../types/clientSignUp";
export interface AuthProps {
    loginUser: (loginValues: LoginValuesProps) => void;
    signUpUser: (values: ClientSignUpValueProps) => void;
}

export const AuthContext = createContext<AuthProps>({} as AuthProps);

export const useAuthContext = () => useContext(AuthContext);
