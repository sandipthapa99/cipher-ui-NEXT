import { EmailOutlined } from "@mui/icons-material";
import Link from "next/link";
import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import type { FormButtonProps } from "types/formButton";

const SocialLoginBtn = ({
    name,
    className,
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
                        <EmailOutlined
                            className={"social-icon__envelope-img"}
                        />
                    </div>
                    <span>{name}</span>
                </button>
            </a>
        </Link>
    );
};

export default SocialLoginBtn;
