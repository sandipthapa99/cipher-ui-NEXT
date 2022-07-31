import { prefix } from "@fortawesome/free-brands-svg-icons";
import { ApplyValueProps } from "types/applyValueProps";
import { BookNowFormProps, BookNowModalCardProps } from "types/bookNow";
import { ClientSignUpValueProps } from "types/clientSignUp";
import { AddPortfolio } from "types/editProfile";
import { EquipmentValueProps } from "types/equipmentValueProps";
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
    prerequesties: [],
};

export const EquipmentFormData: EquipmentValueProps = {
    chargeFor: "",
    price: 1,
    remarks: "",
};
export const AddPortfolioFormData: AddPortfolio = {
    title: "",
    description: "",
    url: "",
    date: "",
};

export const BookServiceFormData: BookNowFormProps = {
    problemDescription: "",
    date: "",
    time: 1,
    image: "",
};
