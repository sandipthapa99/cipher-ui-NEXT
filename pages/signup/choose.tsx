import FormButton from "@components/common/FormButton";
import OnBoardingLayout from "@components/OnBoardingLayout";
import { Field, Form, Formik } from "formik";
import Image from "next/image";
import { isSubmittingClass } from "utils/helpers";

const Choose = () => {
    return (
        <OnBoardingLayout
            topLeftText="Already have an account?"
            topRightText="Sign in"
            headerText="How would you like to Sign Up?"
            mainImg="/illustrations/choose.svg"
            redirectionLink="/login"
        >
            <div className="choose">
                <Formik
                    initialValues={{
                        user: "",
                    }}
                    onSubmit={async (values) => {
                        console.log(values.user)
                    }}>
                    {({
                        isSubmitting,
                    }) => (
                        <Form>
                            <div className="radio-cards-wrapper">
                                <label htmlFor="client">
                                    <div className="img-wrapper">
                                        <figure>
                                            <Image
                                                src="/illustrations/signup-as-client.svg"
                                                width={100}
                                                height={100}
                                            />
                                        </figure>
                                    </div>
                                    I am client hiring for services
                                    <p>I am looking forward to hire professional individual and get my work done as quick as possible. I believe in paying good amount for satisfied task.</p>
                                    <Field name="user" type="radio" id="client" value="client" />
                                    <span aria-hidden="true" className="radioIcon"></span>
                                    <span aria-hidden="true" className="focusIndicator"></span>
                                </label>

                                <label htmlFor="merchant">
                                    <div className="img-wrapper">
                                        <figure>
                                            <Image
                                                src="/illustrations/signup-as-client.svg"
                                                width={100}
                                                height={100}
                                            />
                                        </figure>
                                    </div>
                                    I am merchant looking for tasks
                                    <p>I am a hardworking person who seeks oppurtunity in every task focusing on uplifting my careers to next heights. I priotorize in completing my tasks..</p>
                                    <Field name="user" type="radio" id="merchant" value="merchant" />
                                    <span aria-hidden="true" className="radioIcon"></span>
                                    <span aria-hidden="true" className="focusIndicator"></span>
                                </label>
                            </div>
                            <FormButton
                                type="submit"
                                variant="primary"
                                name="Continue"
                                className="login-btn"
                                isSubmitting={isSubmitting}
                                isSubmittingClass={isSubmittingClass(isSubmitting)}
                            />

                        </Form>
                    )}
                </Formik>
            </div>


        </OnBoardingLayout>
    )
}
export default Choose;