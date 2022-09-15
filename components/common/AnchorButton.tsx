import Link from "next/link";
import type { ReactNode } from "react";

interface AnchorButtonProps {
    children: ReactNode;
    className: string;
    href: string;
    varient: "secondary" | "";
    onClick?: () => void;
}

const AnchorButton = ({
    children,
    href,
    className,
    varient,
    onClick,
}: AnchorButtonProps) => {
    return (
        <Link href={href}>
            <a
                onClick={onClick}
                className={`btn anchor-button ${className} ${varient}`}
            >
                <span>{children}</span>
            </a>
        </Link>
    );
};
export default AnchorButton;
