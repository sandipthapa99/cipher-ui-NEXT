import { ApplyValueProps } from "types/applyValueProps";
import { BookNowFormProps } from "types/bookNow";
import { CertificationValueProps } from "types/CertificationValueProps";
import { ClientSignUpValueProps } from "types/clientSignUp";
import { AddPortfolio, AddSkills } from "types/editProfile";
import { EducationValueProps } from "types/EducationValueProps";
import { EquipmentValueProps } from "types/equipmentValueProps";
import { ExperienceValueProps } from "types/experienceValueProps";
import { LoginValuesProps } from "types/login";
import { ProfileEditValueProps } from "types/ProfileEditValueProps";

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
    toggle: false,
};

export const AddPortfolioFormData: AddPortfolio = {
    title: "",
    description: "",
    url: "",
    date: "",
};

export const AddSkillFormData: AddSkills = {
    name: "",
};

export const BookServiceFormData: BookNowFormProps = {
    problemDescription: "",
    date: "",
    time: 1,
    image: "",
};

export const CertificationFromData: CertificationValueProps = {
    name: "",
    organization: "",
    description: "",
    toggle: false,
    credentialId: "",
    certificateURL: "",
    issuedDate: null,
    expirationDate: null,
};

export const ProfileEditFromData: ProfileEditValueProps = {
    name: "",
    bio: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    activeHoursFrom: "",
    activeHoursTo: "",
    specialities: "",
    baseRatePerHour: "",
    linkedAccounts: "",
};

export const EducationFormData: EducationValueProps = {
    school: "",
    description: "",
    degree: "",
    fieldOfStudy: "",
    location: "",
    startDate: null,
    endDate: null,
};
