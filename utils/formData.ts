import { ApplyValueProps } from "types/applyValueProps";
import { ClientSignUpValueProps } from "types/clientSignUp";
import { LoginValuesProps } from "types/login";

// Login page data
export const loginFormData: LoginValuesProps = {
    email: "",
    password: "",
};

export const ClientSignUpFormData: ClientSignUpValueProps = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    gender: "male",
    isAgree: true,
    addToNewsletter: true,
};

export const ApplyFormData: ApplyValueProps = {
    price: "",
    remarks: "",
};
