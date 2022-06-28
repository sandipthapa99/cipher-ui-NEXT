import FormButton from "@components/common/FormButton"
import InputField from "@components/common/InputField"
import PasswordField from "@components/common/PasswordField"
import SocialLoginBtn from "@components/common/SocialLoginBtn"
import LoginLayout from "@components/LoginLayout"
import { Form, Formik } from "formik"
import React from "react"
import { loginFormData } from "utils/formData"
import loginFormSchema from "utils/formValidation/loginFormValidation"
import { isSubmittingClass } from "utils/helpers"

const Login = () => {
  return (
    <section>
      <LoginLayout
        topLeftText="Don’t have an account ?"
        topRightText="Create an account"
        welcomeText="Welcome Back!   👋"
        headerText="Login to your account"
        link="/auth/Register"
      >
        <div>
      <Formik
        initialValues={loginFormData}
        validationSchema={loginFormSchema}
        onSubmit={async (values, actions) => {
          console.log(values,actions)
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="login-form">
            <InputField
              type="email"
              name="email"
              labelName="Email"
              touch={touched.email}
              error={errors.email}
              placeHolder="example@example.com"
            />
            <PasswordField
              type="password"
              name="password"
              labelName="Password"
              touch={touched.password}
              error={errors.password}
              placeHolder="xxxxxxxxxxxxxx"
              forgotPassword="Forget Password?"
            />
            <FormButton
                type="submit"
                variant="primary"
                name="Login"
                className="login-btn"
                isSubmitting={isSubmitting}
                isSubmittingClass={isSubmittingClass(isSubmitting)}
            />

            <div className="horizontal-line">
              <span className="or">OR</span>
            </div>

            <SocialLoginBtn 
            name={"Sign in with Facebook"}
            icon="/illustrations/fb.svg"
            className="facebook"
            ></SocialLoginBtn>

            <SocialLoginBtn 
            name={"Sign in with Google"}
            icon="/illustrations/google.svg"
            className="google"
            ></SocialLoginBtn>
          </Form>
        )}
      </Formik>
    </div>
      </LoginLayout>
    </section>
    
  )
}
export default Login


{/* <div className="login-layout-wrapper__left">
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
                </div> */}