import FormButton from "@components/common/FormButton";
import OnBoardingLayout from "@components/OnBoardingLayout";
import { Field, Form, Formik } from "formik";
import Image from "next/image";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { isSubmittingClass } from "utils/helpers";

const Choose = () => {
    const [user, setUser] = useState<string>("client");

    return (
        <OnBoardingLayout
            topLeftText="Already have an account?"
            topRightText="Sign in"
            headerText="How would you like to Sign Up?"
            mainImg="/illustrations/choose.svg"
            redirectionLink="/login"
            currentPage="choose"
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
                            <Row className="radio-cards-wrapper">
                                <Col md={6}>
                                    <div className="choose-card-block" onClick={() => setUser("client")}>
                                        <span className={`${user == "client" ? "radio radio-active" : "radio"}`}></span>
                                        <figure className="thumbnail-img">
                                            <Image
                                                src="/illustrations/signup-as-client.svg"
                                                height={100}
                                                width={100}
                                                objectFit="cover"
                                                alt="client-image"
                                            />
                                        </figure>
                                        <div className="card-content">
                                            <div className="account-description">
                                                <h2 className="account-title">I am client hiring for services</h2>
                                                <p className="account-description">
                                                    I am looking forward to hire professional individual and get my work done as quick as possible. I believe in paying good amount for satisfied task.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="choose-card-block" onClick={() => setUser("merchant")}>
                                        <span className={`${user == "merchant" ? "radio radio-active" : "radio"}`}></span>
                                        <figure className="thumbnail-img">
                                            <Image
                                                src="/illustrations/signup-as-tasker.svg"
                                                height={80}
                                                width={80}
                                                objectFit="cover"
                                                alt="merchant-image"
                                            />
                                        </figure>
                                        <div className="card-content">
                                            <div className="account-description">
                                                <h2 className="account-title">I am merchant looking for tasks</h2>
                                                <p className="account-description">
                                                I am a hardworking person who seeks oppurtunity in every task focusing on uplifting my careers to next heights. I priotorize in completing my tasks.
                                                </p>
                                            </div>
                                        </div>

                                    </div>
                                </Col>
                            </Row>
                            <div className="continue-btn-wrapper">
                                <FormButton
                                    type="submit"
                                    variant="primary"
                                    name="Continue"
                                    className="continue-btn"
                                    isSubmitting={isSubmitting}
                                    isSubmittingClass={isSubmittingClass(isSubmitting)}
                                />
                            </div>

                        </Form>
                    )}
                </Formik>
            </div>


        </OnBoardingLayout>
    )
}
export default Choose;