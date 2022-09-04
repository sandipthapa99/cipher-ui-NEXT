import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/pro-regular-svg-icons";
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
                            icon={
                                className === "facebook"
                                    ? faFacebook
                                    : faEnvelope
                            }
                            className={
                                className === "facebook"
                                    ? "social-icon__fb-img"
                                    : "social-icon__envelope-img"
                            }
                        />
                    </div>
                    <span>{name}</span>
                </button>
            </a>
        </Link>
    );
};

export default SocialLoginBtn;
