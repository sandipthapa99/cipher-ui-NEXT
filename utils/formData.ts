import { prefix } from "@fortawesome/free-brands-svg-icons";
import { ApplyValueProps } from "types/applyValueProps";
import { ClientSignUpValueProps } from "types/clientSignUp";
import { AddPortfolio } from "types/editProfile";
import { EquipmentValueProps } from "types/equipmentValueProps";
import { ExperienceValueProps } from "types/experienceValueProps";
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

//apply form data
export const ApplyFormData: ApplyValueProps = {
    price: "",
    remarks: "",
    prerequesties: [],
};

//Equipment form data
export const EquipmentFormData: EquipmentValueProps = {
    chargeFor: "",
    price: 1,
    remarks: "",
};

//Experience form data
export const ExperienceFromData: ExperienceValueProps = {
    title: "",
    description: "",
    typeOfEmployment: "",
    companyName: "",
    location: "",
    startDate: null,
    endDate: null,
};

export const AddPortfolioFormData: AddPortfolio = {
    title: "",
    description: "",
    url: "",
    date: "",
};
