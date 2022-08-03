import type { ApplyValueProps } from "types/applyValueProps";
import type { BookNowFormProps } from "types/bookNow";
import type { CertificationValueProps } from "types/CertificationValueProps";
import type { ClientSignUpValueProps } from "types/clientSignUp";
import type { AddPortfolio, AddSkills } from "types/editProfile";
import type { EducationValueProps } from "types/EducationValueProps";
import type { EquipmentValueProps } from "types/equipmentValueProps";
import type { ExperienceValueProps } from "types/experienceValueProps";
import type { LoginValuesProps } from "types/login";
import type { ProfileEditValueProps } from "types/ProfileEditValueProps";
import type { SkillsValueProps } from "types/skillsValueProps";

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
    startdate: "",
    enddate: "",
    time: 1,
    image: "/services/s1.png",
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
export const SkillsFromData: SkillsValueProps = {
    skills: "",
};
