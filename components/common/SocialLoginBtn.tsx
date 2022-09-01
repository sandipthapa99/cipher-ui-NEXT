import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import type { FormButtonProps } from "types/formButton";

const SocialLoginBtn = ({
    name,
    className,
    icon,
    redirectionLink,
    ...restProps
}: FormButtonProps &
    Partial<
        DetailedHTMLProps<
            ButtonHTMLAttributes<HTMLButtonElement>,
            HTMLButtonElement
        >
    >) => {
    return (
        <Link href={redirectionLink ?? "/"}>
            <a>
                <button {...restProps} className={`social-btn ${className}`}>
                    <div className="social-icon">
                        <FontAwesomeIcon
                            icon={faFacebook}
                            className="social-icon__img"
                        />
                    </div>
                    <span>{name}</span>
                </button>
            </a>
        </Link>
    );
};

export default SocialLoginBtn;
