import Image from "next/image"
import Link from "next/link"
import React, { ReactNode } from "react"

interface LayoutProps {
  topLeftText: string
  children: ReactNode
  topRightText: string
  welcomeText: string
  headerText: string
  link: string
}

const LoginLayout = ({
  children,
  topLeftText,
  topRightText,
  welcomeText,
  headerText,
  link,
}: LayoutProps) => {
  return (
    <div className="login-layout-wrapper">
      <div className="login-layout-wrapper__left">
        <div className="brand-logo">
            <Link href="/">
                <a>
                    <Image
                        src="/logo/logo.svg"
                        alt="Logo"
                        width={95}
                        height={48}
                        priority
                    />
                </a>
            </Link>
        </div>
        <div className="main-img">
          <Image
              src="/illustrations/login.svg"
              alt="Logo"
              width={564}
              height={530}
              priority
          />
        </div>
      </div>
      
      <div className="login-layout-wrapper__right">
        <div className="redirection-text">
            <p>
            {topLeftText}
            <span>
                <Link href="signup">
                    <a>
                    {topRightText}
                    </a>
                </Link>
            </span>
            </p>
        </div>
        <div className="form-wrapper">
            <div className="form-content">
              <p className="welcome-text">{welcomeText}</p>
              <p className="login-text">{headerText}</p>
              {children}
            </div>
        </div>
      </div>
    </div>
  )
}

export default LoginLayout
