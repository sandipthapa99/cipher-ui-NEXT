import FormButton from "@components/common/FormButton"
import PasswordField from "@components/common/PasswordField"
import OnBoardingLayout from "@components/OnBoardingLayout"
import { Form, Formik } from "formik"
import loginFormSchema from "utils/formValidation/loginFormValidation"
import { isSubmittingClass } from "utils/helpers"

const ResetPassword = () => {
    return (
        <OnBoardingLayout
            topLeftText="Already have an account ?"
            topRightText="Login"
            welcomeText="Hey! No worries   👋"
            headerText="Reset your password?"
            mainImg="/illustrations/forgot-pass.svg"
            redirectionLink="/login"
        >
            <Formik
            initialValues={{ password: "", confirmPassword:"" }}
            validationSchema={loginFormSchema}
            onSubmit={async (values, actions) => {
              console.log(values, actions)
            }}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="login-form">
                <PasswordField
                  type="password"
                  name="password"
                  labelName="Password"
                  touch={touched.password}
                  error={errors.password}
                  placeHolder="&#9679; &#9679; &#9679; &#9679; &#9679; &#9679; &#9679; &#9679; &#9679; &#9679; &#9679; &#9679;"
                />
                <PasswordField
                  type="password"
                  name="password"
                  labelName="Password"
                  touch={touched.confirmPassword}
                  error={errors.confirmPassword}
                  placeHolder="&#9679; &#9679; &#9679; &#9679; &#9679; &#9679; &#9679; &#9679; &#9679; &#9679; &#9679; &#9679;"
                />
                <FormButton
                  type="submit"
                  variant="primary"
                  name="Reset"
                  className="login-btn"
                  isSubmitting={isSubmitting}
                  isSubmittingClass={isSubmittingClass(isSubmitting)}
                />
              </Form>
            )}
          </Formik>

        </OnBoardingLayout>
    )
}

export default ResetPassword;