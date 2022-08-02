import Breadcrum from "@components/common/Breadcrum";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import SelectInputField from "@components/common/SelectInputField";
import TooltipMessage from "@components/common/Tooltip";
import Layout from "@components/Layout";
import { faCircleQuestion } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import Link from "next/link";
import { Button, Col, Container, Row } from "react-bootstrap";
import { TaxCalculatorFormData } from "utils/formData";
import taxCalculatorSchema from "utils/formValidation/taxCalculatorFormValidation";
import { isSubmittingClass } from "utils/helpers";
import { incomeType, maritalStatus } from "utils/options";
const TaxCalculator: NextPage = () => {
    return (
        <Layout title="Tax-Calculator | Cipher">
            <section className="tax-calculator ">
                <Container fluid="xl">
                    <Breadcrum currentPage="Tax Calculator" />
                    <div className="card-block tax-block">
                        <div className="content">
                            <h1>Tax Calculator</h1>
                        </div>

                        <Row className="d-flex align-items-center">
                            <Col md={6}>
                                <div className="tax-calculator__header">
                                    <h2>Calculate your Personal Income TAX</h2>
                                    <p>
                                        This tax calculator tool is designed as
                                        per the new salary tax which was
                                        announced during Budget Announcement of
                                        2077/2078.
                                    </p>
                                </div>
                                <div className="tax-calculator__form">
                                    <Formik
                                        initialValues={TaxCalculatorFormData}
                                        validationSchema={taxCalculatorSchema}
                                        onSubmit={async (values) => {
                                            console.log(values);
                                        }}
                                    >
                                        {({
                                            isSubmitting,
                                            errors,
                                            touched,
                                        }) => (
                                            <Form>
                                                <div className="marital-status">
                                                    <div className="label">
                                                        <p>Marital Status</p>
                                                    </div>
                                                    <Row>
                                                        <Col md={7}>
                                                            <SelectInputField
                                                                name="marital-status"
                                                                options={
                                                                    maritalStatus
                                                                }
                                                                fieldRequired
                                                                haveIcon={true}
                                                                placeHolder="Unmarried"
                                                            />
                                                        </Col>
                                                    </Row>
                                                </div>
                                                <div className="income">
                                                    <div className="label">
                                                        <p>Income</p>
                                                    </div>
                                                    <Row>
                                                        <Col md={7}>
                                                            <InputField
                                                                type="text"
                                                                name="salary"
                                                                error={
                                                                    errors.salary
                                                                }
                                                                touch={
                                                                    touched.salary
                                                                }
                                                                placeHolder="Salary"
                                                            />
                                                        </Col>
                                                        <Col md={5}>
                                                            <SelectInputField
                                                                name="salary-type"
                                                                options={
                                                                    incomeType
                                                                }
                                                                fieldRequired
                                                                haveIcon={true}
                                                                placeHolder="Yearly"
                                                            />
                                                        </Col>
                                                    </Row>
                                                    <div className="input-wrapper">
                                                        <InputField
                                                            type="text"
                                                            name="festivalBonus"
                                                            error={
                                                                errors.festivalBonus
                                                            }
                                                            touch={
                                                                touched.festivalBonus
                                                            }
                                                            inputIcon={
                                                                faCircleQuestion
                                                            }
                                                        />
                                                        <TooltipMessage
                                                            message="Medical TAX(15% of Medical Expenses)"
                                                            place="right"
                                                        >
                                                            <div>
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faCircleQuestion
                                                                    }
                                                                    className="svg-icon"
                                                                />
                                                            </div>
                                                        </TooltipMessage>
                                                    </div>
                                                    <div className="input-wrapper">
                                                        <InputField
                                                            type="text"
                                                            name="allowances"
                                                            error={
                                                                errors.allowances
                                                            }
                                                            touch={
                                                                touched.allowances
                                                            }
                                                        />
                                                        <TooltipMessage
                                                            message="Medical TAX(15% of Medical Expenses)"
                                                            place="right"
                                                        >
                                                            <div>
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faCircleQuestion
                                                                    }
                                                                    className="svg-icon"
                                                                />
                                                            </div>
                                                        </TooltipMessage>
                                                    </div>
                                                    <div className="input-wrapper">
                                                        <InputField
                                                            type="text"
                                                            name="others"
                                                            error={
                                                                errors.others
                                                            }
                                                            touch={
                                                                touched.others
                                                            }
                                                        />
                                                        <TooltipMessage
                                                            message="Medical TAX(15% of Medical Expenses)"
                                                            place="right"
                                                        >
                                                            <div>
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faCircleQuestion
                                                                    }
                                                                    className="svg-icon"
                                                                />
                                                            </div>
                                                        </TooltipMessage>
                                                    </div>
                                                </div>

                                                <div className="deduction">
                                                    <div className="label">
                                                        <p>Deduction</p>
                                                    </div>
                                                    <div className="input-wrapper">
                                                        <InputField
                                                            type="text"
                                                            name="providentFund"
                                                            error={
                                                                errors.providentFund
                                                            }
                                                            touch={
                                                                touched.providentFund
                                                            }
                                                            haveIcon={true}
                                                            inputIcon={
                                                                faCircleQuestion
                                                            }
                                                        />
                                                        <TooltipMessage
                                                            message="Medical TAX(15% of Medical Expenses)"
                                                            place="right"
                                                        >
                                                            <div>
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faCircleQuestion
                                                                    }
                                                                    className="svg-icon"
                                                                />
                                                            </div>
                                                        </TooltipMessage>
                                                    </div>
                                                    <div className="input-wrapper">
                                                        <InputField
                                                            type="text"
                                                            name="investmentTrust"
                                                            error={
                                                                errors.investmentTrust
                                                            }
                                                            touch={
                                                                touched.investmentTrust
                                                            }
                                                            haveIcon={true}
                                                            inputIcon={
                                                                faCircleQuestion
                                                            }
                                                        />
                                                        <TooltipMessage
                                                            message="Medical TAX(15% of Medical Expenses)"
                                                            place="right"
                                                        >
                                                            <div>
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faCircleQuestion
                                                                    }
                                                                    className="svg-icon"
                                                                />
                                                            </div>
                                                        </TooltipMessage>
                                                    </div>
                                                    <div className="input-wrapper">
                                                        <InputField
                                                            type="text"
                                                            name="insurance"
                                                            error={
                                                                errors.insurance
                                                            }
                                                            touch={
                                                                touched.insurance
                                                            }
                                                            haveIcon={true}
                                                            inputIcon={
                                                                faCircleQuestion
                                                            }
                                                        />
                                                        <TooltipMessage
                                                            message="Medical TAX(15% of Medical Expenses)"
                                                            place="right"
                                                        >
                                                            <div>
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faCircleQuestion
                                                                    }
                                                                    className="svg-icon"
                                                                />
                                                            </div>
                                                        </TooltipMessage>
                                                    </div>
                                                    <div className="input-wrapper">
                                                        <InputField
                                                            type="text"
                                                            name="annualMedicalExpense"
                                                            error={
                                                                errors.annualMedicalExpense
                                                            }
                                                            touch={
                                                                touched.annualMedicalExpense
                                                            }
                                                            haveIcon={true}
                                                            inputIcon={
                                                                faCircleQuestion
                                                            }
                                                        />
                                                        <TooltipMessage
                                                            message="Medical TAX(15% of Medical Expenses)"
                                                            place="right"
                                                        >
                                                            <div>
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faCircleQuestion
                                                                    }
                                                                    className="svg-icon"
                                                                />
                                                            </div>
                                                        </TooltipMessage>
                                                    </div>
                                                </div>
                                                <div className="buttons">
                                                    <Row>
                                                        <Col md={6}>
                                                            <Button className="btn close-btn">
                                                                Reset
                                                            </Button>
                                                        </Col>
                                                        <Col md={6}>
                                                            <FormButton
                                                                type="submit"
                                                                variant="primary"
                                                                name="Calculate Tax"
                                                                className="submit-btn"
                                                                isSubmitting={
                                                                    isSubmitting
                                                                }
                                                                isSubmittingClass={isSubmittingClass(
                                                                    isSubmitting
                                                                )}
                                                                //onClick={handleClose}
                                                            />
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                    <div className="note">
                                        Note:{" "}
                                        <span>
                                            This tool is made for general tax
                                            calculation only. Information from
                                            this tool should not be used for any
                                            other purpose.
                                        </span>
                                        <Link href="#!">
                                            <a href="" className="link">
                                                &nbsp;Learn More
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </Col>
                            <Col md={6}></Col>
                        </Row>
                    </div>
                </Container>
            </section>
        </Layout>
    );
};

export default TaxCalculator;
