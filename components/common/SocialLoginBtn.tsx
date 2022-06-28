import Image from "next/image"
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react"
import { FormButtonProps } from "types/formButton"

const SocialLoginBtn = ({
  name,
  className,
  icon,
  ...restProps
}: FormButtonProps &
  Partial<
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
  >) => {
  return (
    <button {...restProps} className={`social-btn ${className}`}>
      <figure className="social-icon">
        <Image
        src={`${icon}`}
        height={24}
        width={24}
        className=""
        />
      </figure>
      <span>{name}</span>
    </button>
  )
}

export default SocialLoginBtn;
