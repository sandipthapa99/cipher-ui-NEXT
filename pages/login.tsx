import FormButton from "@components/common/FormButton"
import InputField from "@components/common/InputField"
import PasswordField from "@components/common/PasswordField"
import SocialLoginBtn from "@components/common/SocialLoginBtn"
import OnBoardingLayout from "@components/OnBoardingLayout"
import { Form, Formik } from "formik"
import React from "react"
import { loginFormData } from "utils/formData"
import loginFormSchema from "utils/formValidation/loginFormValidation"
import { isSubmittingClass } from "utils/helpers"

const Login = () => {
  return (
    <section>
      <OnBoardingLayout
        topLeftText="Don&apos;t have an account ?"
        topRightText="Create an account"
        welcomeText="Welcome Back!   👋"
        headerText="Login to your account"
        mainImg="/illustrations/login.svg"
        redirectionLink="/signup"
      >
        <div>
          <Formik
            initialValues={loginFormData}
            validationSchema={loginFormSchema}
            onSubmit={async (values, actions) => {
              console.log(values, actions)
            }}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="login-form">
                <InputField
                  type="email"
                  name="email"
                  labelName="Email or phone number"
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
                  placeHolder="&#9679; &#9679; &#9679; &#9679; &#9679; &#9679; &#9679; &#9679; &#9679; &#9679; &#9679; &#9679;"
                  forgotPassword="Forgot Password?"
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
      </OnBoardingLayout>
    </section>

  )
}
export default Login