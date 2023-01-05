import { faChevronLeft } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChevronLeft } from "@mui/icons-material";
import Link from "next/link";
import type { HTMLAttributes } from "react";

interface GoBackLinkProps extends HTMLAttributes<HTMLAnchorElement> {
    type?: "link";
    href: string;
}
interface GoBackButtonProps extends HTMLAttributes<HTMLButtonElement> {
    type?: "button";
    onClick: () => void;
}

type GoBackProps = (GoBackLinkProps | GoBackButtonProps) & { text?: string };

export const GoBack = (props: GoBackProps) => {
    const { className, text, ...restProps } = props;
    const goBackClass = ["go-back", className].join(" ");

    const GoBackButton = () => {
        const { onClick, ...rest } = restProps as GoBackButtonProps;
        return (
            <button className={goBackClass} {...rest} onClick={onClick}>
                <ChevronLeft className="svg-icon" />
                <span>{text ?? "Go Back"}</span>
            </button>
        );
    };
    const GoBackLink = () => {
        const { href, ...rest } = restProps as GoBackLinkProps;
        return (
            <Link href={href}>
                <a className={goBackClass} {...rest}>
                    <ChevronLeft className="svg-icon" />
                    <span>Go Back</span>
                </a>
            </Link>
        );
    };
    return props.type === "button" ? <GoBackButton /> : <GoBackLink />;
};
