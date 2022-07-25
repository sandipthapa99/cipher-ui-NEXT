import { ButtonHTMLAttributes, DetailedHTMLProps } from "react"

import { FormButtonProps } from "../../types/formButton"

const GoogleButton = ({
  name,
  className,
  ...restProps
}: FormButtonProps &
  Partial<
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
  >) => {
  return (
    <button {...restProps} className={`login-with-google-btn ${className}`}>
      <span>{name}</span>
    </button>
  )
}

export default GoogleButton
