import Link from "next/link";
import { ReactNode } from "react";
import { Button } from "react-bootstrap";

interface AnchorButtonProps {
    children: ReactNode;
    className: string;
    href: string;
}

const AnchorButton = ({ children, href, className }: AnchorButtonProps) => {
    return (
        <>
            <Link href={href}>
                <a className={`btn anchor-button ${className}`}>
                    <span>{children}</span>
                </a>
            </Link>
        </>
    );
};
export default AnchorButton;
