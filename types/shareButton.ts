export interface ShareButtonProps {
    show?: boolean;
    showText?: boolean;
    url: string;
    quote: string;
    hashtag: string;
    handleClose?: () => void;
}
