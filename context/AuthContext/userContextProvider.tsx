import axios from "axios";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { ReactNode } from "react";
import { LoginValuesProps } from "types/login";
import { axiosClient } from "utils/axiosClient";

import { ClientSignUpValueProps } from "../../types/clientSignUp";
import { AuthContext } from "./userContext";

interface Props {
    children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
    const router = useRouter();
    const signUp = async (signUpValues: ClientSignUpValueProps) => {
        try {
            const allUsers = await axiosClient.get("/users");
            const users: Array<ClientSignUpValueProps> = allUsers.data;
            const duplicateEmailAndPhone = users.find(
                (user) =>
                    user.email === signUpValues.email ||
                    user.phoneNumber === signUpValues.phoneNumber
            );
            console.log(duplicateEmailAndPhone);

            if (duplicateEmailAndPhone) {
                alert("duplicated email and phone");
                return;
            } else {
                const response = await axiosClient.post("/users", signUpValues);
                router.replace("/login");
            }
        } catch (error: any) {
            alert(error.message);
        }
    };
    const login = async (loginValues: LoginValuesProps) => {
        try {
            const allUsers = await axiosClient.get("/users");
            const users: Array<LoginValuesProps> = allUsers.data;
            const emailExists = users.find(
                (user) =>
                    user.email === loginValues.email &&
                    user.password === loginValues.password
            );
            console.log(emailExists);

            if (emailExists) {
                setCookie(null, "token", `${new Date().getTime()}`, {
                    maxAge: 30 * 24 * 60 * 60,
                });

                router.replace("/");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const value = {
        signUpUser: signUp,
        loginUser: login,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
export default AuthProvider;
