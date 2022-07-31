import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { ReactNode, useEffect, useState } from "react";
import { LoginValuesProps } from "types/login";
import { axiosClient } from "utils/axiosClient";

import { ClientSignUpValueProps } from "../../types/clientSignUp";
import { AuthContext } from "./userContext";

interface Props {
    children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
    const [userDetails, setUserDetails] = useState({});
    const router = useRouter();

    // const signUp = async (signUpValues: ClientSignUpValueProps) => {
    //     try {
    //         const allUsers = await axiosClient.get("/users");
    //         const users: Array<ClientSignUpValueProps> = allUsers.data;
    //         const duplicateEmailAndPhone = users.find(
    //             (user: { email: string; phoneNumber: string }) =>
    //                 user.email === signUpValues.email ||
    //                 user.phoneNumber === signUpValues.phoneNumber
    //         );
    //         console.log(duplicateEmailAndPhone);

    //         if (duplicateEmailAndPhone) {
    //             alert("duplicated email and phone");
    //             return;
    //         } else {
    //             const response = await axiosClient.post("/users", signUpValues);
    //             router.replace("/login");
    //         }
    //     } catch (error: any) {
    //         alert(error.message);
    //     }
    // };
    // const login = async (loginValues: LoginValuesProps) => {
    //     try {
    //         const allUsers = await axiosClient.get("/users");
    //         const users: Array<LoginValuesProps> = allUsers.data;
    //         const emailExists = users.find(
    //             (user: { email: string; password: string }) =>
    //                 user.email === loginValues.email &&
    //                 user.password === loginValues.password
    //         );
    //         console.log(emailExists);

    //         if (emailExists) {
    //             setCookie(null, "token", "dfdsfdsfdsfsdfsdf", {
    //                 maxAge: 30 * 24 * 60 * 60,
    //             });

    //             router.replace("/");
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const signUp = (signUpValues: ClientSignUpValueProps) => {
        if (typeof window !== "undefined") {
            localStorage.setItem("userDetails", JSON.stringify(signUpValues));
            router.push("/login");
        }
    };
    const login = (loginValues: LoginValuesProps) => {
        if (typeof window !== "undefined") {
            setUserDetails((prev) => localStorage.getItem("userDetails"));
        }

        console.log(userDetails);
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
