import { createContext, useContext } from "react";

export interface LoginProps {
    userToken: string;
    isUserLoggedIn: boolean;
}

export const UserContext = createContext<LoginProps>({} as LoginProps);

export const useUserContext = () => useContext(UserContext);
