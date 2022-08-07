import type { CreditCardContent } from "staticData/creditCardContent";
import type { AccountValueProps } from "types/accountValueProps";
import type { ApplyValueProps } from "types/applyValueProps";
import type { BookNowFormProps } from "types/bookNow";
import type { CertificationValueProps } from "types/certificationValueProps";
import type { changePasswordValueProps } from "types/changePasswordValueProps";
import type { ClientSignUpValueProps } from "types/clientSignUp";
import type { deactivateValueProps } from "types/deactivateValueProps";
import type { AddPortfolio, AddSkills } from "types/editProfile";
import type { EducationValueProps } from "types/educationValueProps";
import type { EquipmentValueProps } from "types/equipmentValueProps";
import type { ExperienceValueProps } from "types/experienceValueProps";
import type { KYCFormProps } from "types/kycFormProps";
import type { LoginValuesProps } from "types/login";
import type { ProfileEditValueProps } from "types/ProfileEditValueProps";
import type { SkillsValueProps } from "types/skillsValueProps";
import type { TaxCalculatorValueProps } from "types/taxCalculatorValueProps";

// Login page data
export const loginFormData: LoginValuesProps = {
    email: "",
    password: "",
};

export const ClientSignUpFormData: ClientSignUpValueProps = {
    // firstName: "",
    // lastName: "",
    email: "",
    // phoneNumber: "",
    password: "",
    confirmPassword: "",
    // gender: "male",
    // isAgree: true,
    // addToNewsletter: true,
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
    url: null,
    date: null,
};

export const AddSkillFormData: AddSkills = {
    name: "",
};

export const BookServiceFormData: BookNowFormProps = {
    problemDescription: "",
    startdate: null,
    enddate: null,
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

export const AccountFromData: AccountValueProps = {
    fullName: "",
    email: "",
    bio: "",
    gender: "",
    dateOfBirth: null,
    specialities: "",
    experienceLevel: "",
    activeHoursFrom: "",
    activeHoursTo: null,
    baseRatePerHour: null,
    userType: "",
    country: "",
    addressLine1: "",
    addressLine2: "",
    language: "",
    currency: "",
    visibility: "",
    taskPreferences: "",
};

export const ChangePasswordFromData: changePasswordValueProps = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    toggle: false,
};

export const TaxCalculatorFormData: TaxCalculatorValueProps = {
    maritalStatus: "Unmarried",
    salary: null,
    festivalBonus: null,
    salaryType: "Yearly",
    allowances: null,
    others: null,
    providentFund: null,
    investmentTrust: null,
    insurance: null,
    medicalInsurance: null,
};

export const DeactivateFromData: deactivateValueProps = {
    reason: "",
    duration: "",
    explaination: "",
};

export const CreditCardFromData: CreditCardContent = {
    id: "",
    number: "",
    name: "",
    expDate: "",
    cvv: "",
    isDefault: false,
};

export const KYCFormData: KYCFormProps = {
    fullName: "",
    identityType: "",
    identityNumber: "",
    issuedFrom: null,
    issuedDate: null,
    expiryDate: null,
    identityCard: [],
    panNumber: "",
    issuedLoaction: "",
    panIssuedDate: "",
    panPhoto: [],
    passwordPhoto: [],
    addressVerifiactionDocument: [],
    bankName: "",
    bankAccountName: "",
    bankAccountNumber: "",
};
