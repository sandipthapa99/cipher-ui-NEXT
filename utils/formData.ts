import type { CreditCardContent } from "staticData/creditCardContent";
import type { AccountValueProps } from "types/accountValueProps";
import type { ApplyFormValueProps } from "types/applyFormValueProps";
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
import type { PostTaskProps } from "types/postTaskData";
import type { ProfileEditValueProps } from "types/ProfileEditValueProps";
import type { SkillsValueProps } from "types/skillsValueProps";
import type { TaxCalculatorValueProps } from "types/taxCalculatorValueProps";
import type { UploadCVValueProps } from "types/uploadCVValueProps";

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
    url: "",
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
    field_of_study: "",
    location: "",
    start_date: "",
    end_date: "",
};

export const SkillsFromData: SkillsValueProps = {
    skills: "",
};

export const AccountFromData: AccountValueProps = {
    full_name: "",
    phone: 1234567890,
    email: "",
    bio: "",
    gender: "",
    date_of_birth: null,
    skill: "",
    experience_level: "",
    active_hour_start: "",
    active_hour_end: null,
    hourly_rate: 15,
    user_type: "",
    country: "",
    education: "abc",
    address_line1: "",
    address_line2: "",
    language: "",
    charge_currency: "",
    profile_visibility: "",
    task_preferences: "",
    // profile_image: "abcffdd",
};

export const ChangePasswordFromData: changePasswordValueProps = {
    new_password: "",
    old_password: "",
    confirm_password: "",
};

export const TaxCalculatorFormData: TaxCalculatorValueProps = {
    marital_status: "Unmarried",
    salary: null,
    income_time: "Yearly",
    festival_bonus: null,
    allowance: null,
    others: null,
    pf: null,
    cit: null,
    life_insurance: null,
    medical_insurance: null,
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

// export const KYCFormData: KYCFormProps = {
//     full_name: "",
//     identity_type: "",
//     identity_id: "",
//     identity_issued_date: null,
//     identity_valid_through: null,
//     identity_issuer_organization: "",
//     pan_number: null,
//     pan_issued_from: "",
//     pan_issued_date: "",
//     pan_card_file: null,
//     passport_size_photo: null,
//     personal_address_verification_document: null,
//     bank_name: "",
//     bank_account_name: "",
//     bank_account_number: "",
// };

export const CarrerApplyFormData: ApplyFormValueProps = {
    full_name: "",
    email: "",
    phone: "",
    current_company: "",
    experience: "",
    portfolio_link: "",
    cover_letter: "",
    cv: [],
    g_recaptcha_response: "",
    imagePreviewUrl: [],
};

export const UploadCVFormData: UploadCVValueProps = {
    full_name: "",
    email: "",
    phone: "",
    cv: [],
    imagePreviewUrl: [],
    applied_position: "",
    g_recaptcha_response: "",
};

export const PostTaskFormData: PostTaskProps = {
    title: "",
    taskDescription: "",
    requirements: [],
    category: "",
    task_type: "remote",
    address: "",
    budget: "",
    minBudget: 0,
    maxBudget: 0,
    image: undefined,
    video: undefined,
    date: null,
    date_from: null,
    date_to: null,
};
