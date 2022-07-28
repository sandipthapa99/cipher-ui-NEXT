import Link from "next/link";
import { ReactNode } from "react";
import { Button } from "react-bootstrap";

interface AnchorButtonProps {
    children: ReactNode;
    className: string;
    href: string;
    varient: "secondary" | "";
}

const AnchorButton = ({
    children,
    href,
    className,
    varient,
}: AnchorButtonProps) => {
    return (
        <>
            <Link href={href}>
                <a className={`btn anchor-button ${className} ${varient}`}>
                    <span>{children}</span>
                </a>
            </Link>
        </>
    );
};
export default AnchorButton;
