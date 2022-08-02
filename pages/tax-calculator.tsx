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
import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { TaxCalculatorFormData } from "utils/formData";
import taxCalculatorSchema from "utils/formValidation/taxCalculatorFormValidation";
import { isSubmittingClass } from "utils/helpers";
import { incomeType, maritalStatus } from "utils/options";

const TaxCalculator: NextPage = () => {
    const taxContent = [
        {
            id: "0",
            name: "Annual Gross Salary",
            amount: "0.00",
        },
        {
            id: "1",
            name: "Taxable Income",
            amount: "0.00",
        },
        {
            id: "2",
            name: "Net Payable Tax",
            amount: "0.00",
        },
    ];

    const table = [
        {
            id: "0",
            heading: [
                {
                    id: "0",
                    name: "Taxable Salary",
                },
                {
                    id: "1",
                    name: "Taxable Amount",
                },
                {
                    id: "2",
                    name: "Tax Rate",
                },
                {
                    id: "3",
                    name: "Tax Liability",
                },
            ],
            data: [
                {
                    id: "0",
                    salary: "First Slab",
                    amount: "3003,0330",
                    rate: "1%",
                    liability: "3003,0330",
                },
                {
                    id: "1",
                    salary: "Net Tax Liability(yearly)",
                    amount: "",
                    rate: "",
                    liability: "3003,0330",
                },
                {
                    id: "2",
                    salary: "Net Tax Liability(monthly)",
                    amount: "",
                    rate: "",
                    liability: "30030",
                },
            ],
        },
    ];
    return (
        <Layout title="Tax-Calculator | Cipher">
            <section className="tax-calculator ">
                <Container fluid="xl">
                    <Breadcrum currentPage="Tax Calculator" />
                    <div className="card-block">
                        <div className="content">
                            <h1>Tax Calculator</h1>
                        </div>

                        <Row className="gx-5">
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
                                            console.log("calues", values);
                                        }}
                                    >
                                        {({
                                            isSubmitting,
                                            errors,
                                            resetForm,
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
                                                                placeHolder="Unmarried"
                                                                fieldRequired
                                                                haveIcon={true}
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
                                                                name="salary"
                                                                type="text"
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
                                                                type="text"
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
                                                            name="festivalBonus"
                                                            type="text"
                                                            error={
                                                                errors.festivalBonus
                                                            }
                                                            touch={
                                                                touched.festivalBonus
                                                            }
                                                            inputIcon={
                                                                faCircleQuestion
                                                            }
                                                            placeHolder="Festival Bonus"
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
                                                            placeHolder="Allowances"
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
                                                            placeHolder="Others"
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
                                                            placeHolder="Provident Fund"
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
                                                            placeHolder="Investment Trust"
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
                                                            placeHolder="Insurance"
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
                                                            name="medicalInsurance"
                                                            placeHolder="Medical Insurance"
                                                            error={
                                                                errors.medicalInsurance
                                                            }
                                                            touch={
                                                                touched.medicalInsurance
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
                                                            <FormButton
                                                                type="submit"
                                                                variant="primary"
                                                                name="Reset"
                                                                className="btn close-btn"
                                                                isSubmitting={
                                                                    isSubmitting
                                                                }
                                                                isSubmittingClass={isSubmittingClass(
                                                                    isSubmitting
                                                                )}
                                                                onClick={() =>
                                                                    resetForm()
                                                                }
                                                            />
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
                            <Col md={6}>
                                <Row className="d-flex tax-blocks align-items-stretch">
                                    {taxContent.map((tax) => (
                                        <Col
                                            className="d-flex tax-block"
                                            lg={3}
                                            md={12}
                                            key={tax.id}
                                        >
                                            <h1>{tax.name}</h1>
                                            <span>{tax.amount}</span>
                                        </Col>
                                    ))}
                                </Row>
                                <div className="tax-slab">
                                    <h1>Your tax slab is</h1>
                                    <span>Upto 1 %</span>
                                </div>
                                <div className="table-content">
                                    {table.map((info) => (
                                        <Table responsive key={info.id}>
                                            <thead>
                                                <tr>
                                                    {info.heading.map((th) => (
                                                        <th key={th.id}>
                                                            {th.name}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {info.data.map((td) => (
                                                    <tr key={td.id}>
                                                        <td>{td.salary}</td>
                                                        <td>{td.amount}</td>
                                                        <td>{td.rate}</td>
                                                        <td>{td.liability}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    ))}
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </section>
        </Layout>
    );
};

export default TaxCalculator;
