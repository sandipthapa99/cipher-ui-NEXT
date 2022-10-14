export interface ShareButtonProps {
    show?: boolean;
    showText?: boolean;
    url: string;
    quote: string;
    hashtag: string;
    className?: string;
    handleClose?: () => void;
}
