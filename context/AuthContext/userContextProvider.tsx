
import { sign } from 'crypto';
import { ReactNode, useState } from 'react';
import { AuthProps, AuthContext } from './userContext';
import { ClientSignUpValueProps } from '../../types/clientSignUp'
import axios from 'axios';
import { axiosClient } from 'utils/axiosClient';
import { useRouter } from 'next/router';


interface Props {
	children: ReactNode;
}


const AuthProvider = ({ children }: Props) => {


	const router = useRouter()
	const signUp = async (signUpValues: ClientSignUpValueProps) => {



		try {
			const allUsers = await axiosClient.get('/users')
			const users = allUsers.data
			const duplicateEmailAndPhone = users.find(user => user.email === signUpValues.email || user.phoneNumber === signUpValues.phoneNumber)
			console.log(duplicateEmailAndPhone);
			
			if(duplicateEmailAndPhone){
             alert("duplicated email and phone")
			 return
			}else{
				const response = await axiosClient.post('/users', signUpValues)
				router.replace('/login')
			}
			
			
			

			
		} catch (error: any) {
			alert(error.message)
		}

	}
	const login = () => {


	}


	const value = {
		signUpUser: signUp,
		loginUser: login

	}

	return <AuthContext.Provider value={value} >{children}</AuthContext.Provider>;
};
export default AuthProvider;
