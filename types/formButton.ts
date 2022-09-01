export interface FormButtonProps {
    name: string;
    isSubmitting?: boolean;
    isSubmittingClass?: string;
    variant?: "primary" | "secondary";
    className?: string;
    icon?: any;
    redirectionLink?: string;
    handleClick?: () => void;
}
