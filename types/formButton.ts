export interface FormButtonProps {
    name: string;
    isSubmitting?: boolean;
    isSubmittingClass?: string;
    variant?: "primary" | "secondary";
    className?: string;
    icon?:string;
    redirectionLink?:string;
}
