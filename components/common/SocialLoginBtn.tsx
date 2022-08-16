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
                    <figure className="social-icon">
                        <Image
                            src={`${icon}`}
                            height={24}
                            width={24}
                            className=""
                            alt="icon"
                        />
                    </figure>
                    <span>{name}</span>
                </button>
            </a>
        </Link>
    );
};

export default SocialLoginBtn;
