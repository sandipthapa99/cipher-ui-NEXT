import { useGetProfile } from "hooks/profile/useGetProfile";
import type { CreditCardContent } from "staticData/creditCardContent";
import type { AccountValueProps } from "types/accountValueProps";
import type { ApplyFormValueProps } from "types/applyFormValueProps";
import type { ApplyValueProps } from "types/applyValueProps";
import type { BankDetailProps, BankPostDetailProps } from "types/bankDetail";
import type { BookNowFormProps } from "types/bookNow";
import type { CertificationValueProps } from "types/certificationValueProps";
import type { changePasswordValueProps } from "types/changePasswordValueProps";
import type { ClientSignUpValueProps } from "types/clientSignUp";
import type { deactivateValueProps } from "types/deactivateValueProps";
import type {
    AddInterests,
    AddPortfolioProps,
    AddSkills,
} from "types/editProfile";
import type { EducationValueProps } from "types/educationValueProps";
import type { EquipmentValueProps } from "types/equipmentValueProps";
import type { ExperienceValueProps } from "types/experienceValueProps";
import type { LoginValuesProps } from "types/login";
import type { PostTaskProps } from "types/postTaskData";
import type { ProfileEditValueProps } from "types/ProfileEditValueProps";
import type { ServicePostProps } from "types/serviceCard";
import type { SkillsValueProps } from "types/skillsValueProps";
import type { TaxCalculatorValueProps } from "types/taxCalculatorValueProps";
import type { UploadCVValueProps } from "types/uploadCVValueProps";

// Login page data
export const loginFormData: LoginValuesProps = {
    username: "",
    password: "",
};

export const ClientSignUpFormData: ClientSignUpValueProps = {
    // firstName: "",
    // lastName: "",
    // email: "",
    // phoneNumber: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    // phone: "",
    // gender: "male",
    // isAgree: true,
    // addToNewsletter: true,
};

//apply form data
export const ApplyFormData: ApplyValueProps = {
    price: "",
    remarks: "",
    prerequesties: [],
    recursion: "",
    budget_to: parseInt(""),
};

//Equipment form data
export const EquipmentFormData: EquipmentValueProps = {
    chargeFor: "",
    price: 1,
    remarks: "",
};

//Experience form data
export const ExperienceFormData: ExperienceValueProps = {
    title: "",
    description: "",
    employment_type: "Full Time",
    company_name: "",
    location: "",
    start_date: "",
    end_date: "",
    currently_working: false,
    id: 0,
};

interface filterReviewProps {
    search_value: "";
}
//review
export const reviewSearchData: filterReviewProps = {
    search_value: "",
};

export const AddPortfolioFormData: AddPortfolioProps = {
    title: "",
    description: "",
    credential_url: "",
    issued_date: "",
    images: [],
    imagePreviewUrl: [],
    pdfPreviewUrl: [],
    files: [],
    id: 0,
};

export const AddSkillFormData: AddSkills = {
    name: "",
};

export const AddInterestFormData: AddInterests = {
    // interests: [
    //     {
    //         id: "",
    //         name: "",
    //     },
    // ],
    interests: [],
};

export const CertificationFormData: CertificationValueProps = {
    name: "",
    issuing_organization: "",
    description: "",
    does_expire: false,
    credential_id: "",
    certificate_url: "",
    issued_date: "",
    expire_date: "",
    id: 0,
};

export const ProfileEditFromData: ProfileEditValueProps = {
    full_name: "",
    bio: "",
    phone: "",
    address_line1: "",
    address_line2: "",
    active_hour_start: "",
    active_hour_end: "",
    skill: "",
    hourly_rate: "",
    linkedAccounts: "",
    date_of_birth: "",
    gender: "",
    profile_image: "",
    user_type: "",
    country: 0,
    language: 0,
    charge_currency: 0,
    task_preferences: "",
    profile_visibility: "",
};

export const EducationFormData: EducationValueProps = {
    school: "",
    description: "",
    degree: "",
    field_of_study: "",
    location: "",
    start_date: "",
    end_date: "",
    id: 0,
};

export const SkillsFormData: SkillsValueProps = {
    skill: "",
};

export const AccountFormData: AccountValueProps = {
    last_name: "",
    first_name: "",
    middle_name: "",
    email: "",
    bio: "",
    gender: "",
    city: "",
    date_of_birth: "",
    skill: "",
    interests: [],
    experience_level: "",
    active_hour_start: "",
    active_hour_end: null,
    hourly_rate: "",
    user_type: "",
    country: "",
    address_line1: "",
    address_line2: "",
    language: "",
    charge_currency: "",
    profile_visibility: "",
    task_preferences: "",
    profile_image: "",
    designation: "",

    // profile_image: "abcffdd",
};

export const ChangePasswordFromData: changePasswordValueProps = {
    new_password: "",
    old_password: "",
    confirm_password: "",
};

export const TaxCalculatorFormData: TaxCalculatorValueProps = {
    marital_status: "Unmarried",
    gender: "Female",
    salary: "",
    income_time: "Yearly",
    festival_bonus: "",
    allowance: "",
    others: "",
    pf: "",
    cit: "",
    life_insurance: "",
    medical_insurance: "",
};

export const DeactivateFromData: deactivateValueProps = {
    reason: "",
    // duration: "",
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
};

export const PostTaskFormData: PostTaskProps = {
    title: "",
    description: "",
    highlights: [],
    category: "",
    location: "remote",
    address: "",
    budget: "",
    minBudget: 0,
    maxBudget: 0,
    images: [],
    videos: [],
    date: null,
    date_from: null,
    date_to: null,
    imagePreviewUrl: [],
    videoPreviewUrl: [],
};

export const ServicePostData: ServicePostProps = {
    title: "",
    budget_type: "Fixed",
    budget_from: "",
    budget_to: "",
    description: "",
    highlights: "",
    location: "",
    is_professional: false,
    is_online: false,
    video: "",
    no_of_revisions: 0,
    discount_type: "",
    discount_value: "",
    is_active: true,
    category: 0,
    currency: 0,
    city: 1,
    images: [],
    imagePreviewUrl: [],
};

export const BankFormData: BankPostDetailProps = {
    bank_account_name: "",
    branch_name: "",
    bank_name: "",
    bank_account_number: "",
    is_primary: false,
};
