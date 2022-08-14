import { BreadCrumb } from "@components/common/BreadCrumb";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import SelectInputField from "@components/common/SelectInputField";
import Layout from "@components/Layout";
import { faCircleQuestion } from "@fortawesome/pro-regular-svg-icons";
import { Form, Formik } from "formik";
import { useTaxCalculator } from "hooks/tax-calculator/useTaxCalculator";
import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { toast } from "react-toastify";
import { TaxCalculatorFormData } from "utils/formData";
import taxCalculatorSchema from "utils/formValidation/taxCalculatorFormValidation";
import { isSubmittingClass } from "utils/helpers";
import { maritalStatus, salaryType } from "utils/options";

const TaxCalculator: NextPage = () => {
    const { mutate, isLoading, data: TableData } = useTaxCalculator();
    console.log("result tax calculator=", TableData);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const taxContent = [
        {
            id: "0",
            name: "Annual Gross Salary",
            amount: `${TableData?.details["annual gross salary"]}`,
        },
        {
            id: "1",
            name: "Taxable Income",
            amount: `${TableData?.details["net taxable income"]}`,
        },
        {
            id: "2",
            name: "Net Payable Tax",
            amount: `${TableData?.details["net payable tax"]}`,
        },
    ];
    const tax_rate = TableData?.details["tax rate"];
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
                    amount: `${TableData?.data[0].taxable_amount}`,
                    rate: `${TableData?.data[0].tax_rate}`,
                    liability: `${TableData?.data[0].tax_liability}`,
                },
                {
                    id: "1",
                    salary: "Net Tax Liability(yearly)",
                    amount: ``,
                    rate: ``,
                    liability: `${TableData?.details["net tax liability yearly"]}`,
                },
                {
                    id: "2",
                    salary: "Net Tax Liability(monthly)",
                    amount: ``,
                    rate: ``,
                    liability: `${TableData?.details["net tax liability monthly"]}`,
                },
            ],
        },
    ];
    return (
        <Layout title="Tax-Calculator | Cipher">
            <section className="tax-calculator ">
                <Container fluid="xl" className="px-5">
                    <BreadCrumb currentPage="Tax Calculator" />
                    <div className="card-block">
                        <div className="header">
                            <h1 className="heading-title">Tax Calculator</h1>
                        </div>
                        <div className="content">
                            <Row className="gx-5">
                                <Col md={6}>
                                    <div className="tax-calculator__header">
                                        <h2 className="heading-title">
                                            Calculate your Personal Income TAX
                                        </h2>
                                        <p>
                                            This tax calculator tool is designed
                                            as per the new salary tax which was
                                            announced during Budget Announcement
                                            of 2077/2078.
                                        </p>
                                    </div>
                                    <div className="tax-calculator__form">
                                        <Formik
                                            initialValues={
                                                TaxCalculatorFormData
                                            }
                                            validationSchema={
                                                taxCalculatorSchema
                                            }
                                            // onSubmit={async (values) => {
                                            //     console.log("values", values);
                                            // }}
                                            onSubmit={async (
                                                values,
                                                actions
                                            ) => {
                                                actions.resetForm();

                                                mutate(values, {
                                                    onSuccess: async () => {
                                                        setIsFormSubmitted(
                                                            true
                                                        );
                                                        console.log(
                                                            "actiobn",
                                                            actions
                                                        );

                                                        actions.resetForm();
                                                        console.log(
                                                            "submitted values",
                                                            values
                                                        );
                                                    },
                                                    onError: async (error) => {
                                                        toast.error(
                                                            error.message
                                                        );
                                                    },
                                                });
                                            }}
                                        >
                                            {({
                                                isSubmitting,
                                                // errors,
                                                resetForm,
                                                touched,
                                            }) => (
                                                <Form>
                                                    <div className="marital-status">
                                                        <div className="label">
                                                            <p>
                                                                Marital Status
                                                            </p>
                                                        </div>
                                                        <Row>
                                                            <Col md={7}>
                                                                <SelectInputField
                                                                    name="marital_status"
                                                                    options={
                                                                        maritalStatus
                                                                    }
                                                                    placeHolder="Unmarried"
                                                                    fieldRequired
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
                                                                    //   error={
                                                                    //     errors.salary
                                                                    //}
                                                                    touch={
                                                                        touched.salary
                                                                    }
                                                                    placeHolder="Salary"
                                                                />
                                                            </Col>
                                                            <Col md={5}>
                                                                <SelectInputField
                                                                    name="income_time"
                                                                    type="text"
                                                                    options={
                                                                        salaryType
                                                                    }
                                                                    fieldRequired
                                                                    placeHolder="Yearly"
                                                                />
                                                            </Col>
                                                        </Row>
                                                        <InputField
                                                            name="festival_bonus"
                                                            type="text"
                                                            //   error={
                                                            //     errors.festival_bonus
                                                            //}
                                                            touch={
                                                                touched.festival_bonus
                                                            }
                                                            haveIcon={true}
                                                            inputIcon={
                                                                faCircleQuestion
                                                            }
                                                            placeHolder="Festival Bonus"
                                                        />

                                                        <InputField
                                                            type="text"
                                                            name="allowance"
                                                            placeHolder="Allowances"
                                                            //   error={
                                                            //     errors.allowance
                                                            //}
                                                            touch={
                                                                touched.allowance
                                                            }
                                                            haveIcon={true}
                                                            inputIcon={
                                                                faCircleQuestion
                                                            }
                                                        />

                                                        <InputField
                                                            type="text"
                                                            name="others"
                                                            placeHolder="Others"
                                                            //   error={
                                                            //     errors.others
                                                            //}
                                                            touch={
                                                                touched.others
                                                            }
                                                            haveIcon={true}
                                                            inputIcon={
                                                                faCircleQuestion
                                                            }
                                                        />
                                                    </div>

                                                    <div className="deduction">
                                                        <div className="label">
                                                            <p>Deduction</p>
                                                        </div>
                                                        <InputField
                                                            type="text"
                                                            name="pf"
                                                            //   error={
                                                            //     errors.providentFund
                                                            //}
                                                            placeHolder="Provident Fund"
                                                            touch={touched.pf}
                                                            haveIcon={true}
                                                            inputIcon={
                                                                faCircleQuestion
                                                            }
                                                        />

                                                        <InputField
                                                            type="text"
                                                            name="cit"
                                                            placeHolder="Investment Trust"
                                                            //   error={
                                                            //     errors.cit
                                                            //}
                                                            touch={touched.cit}
                                                            haveIcon={true}
                                                            inputIcon={
                                                                faCircleQuestion
                                                            }
                                                        />

                                                        <InputField
                                                            type="text"
                                                            placeHolder="Insurance"
                                                            name="life_insurance"
                                                            //   error={
                                                            //     errors.life_insurance
                                                            //}
                                                            touch={
                                                                touched.life_insurance
                                                            }
                                                            haveIcon={true}
                                                            inputIcon={
                                                                faCircleQuestion
                                                            }
                                                        />

                                                        <InputField
                                                            type="text"
                                                            name="medical_insurance"
                                                            placeHolder="Medical Insurance"
                                                            //   error={
                                                            //     errors.medical_insurance
                                                            //}
                                                            touch={
                                                                touched.medical_insurance
                                                            }
                                                            haveIcon={true}
                                                            inputIcon={
                                                                faCircleQuestion
                                                            }
                                                        />
                                                    </div>
                                                    <div className="buttons">
                                                        <Row>
                                                            <Col
                                                                lg={6}
                                                                md={12}
                                                                className="reset-btn"
                                                            >
                                                                <FormButton
                                                                    name="Reset"
                                                                    className="btn close-btn"
                                                                    onClick={() =>
                                                                        resetForm()
                                                                    }
                                                                />
                                                            </Col>
                                                            <Col lg={6} md={12}>
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
                                                This tool is made for general
                                                tax calculation only.
                                                Information from this tool
                                                should not be used for any other
                                                purpose.
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
                                                <h1 className="heading-title">
                                                    {tax.name}
                                                </h1>
                                                <span>
                                                    {isFormSubmitted
                                                        ? tax.amount
                                                        : `0.00`}{" "}
                                                </span>
                                            </Col>
                                        ))}
                                    </Row>
                                    <div className="tax-slab">
                                        <h1 className="heading-title">
                                            Your tax slab is
                                        </h1>
                                        <span>
                                            Upto &nbsp;
                                            {isFormSubmitted ? tax_rate : `0%`}
                                        </span>
                                    </div>
                                    <div className="table-content">
                                        {table.map((info) => (
                                            <Table responsive key={info.id}>
                                                <thead>
                                                    <tr>
                                                        {info.heading.map(
                                                            (th) => (
                                                                <th key={th.id}>
                                                                    {th.name}
                                                                </th>
                                                            )
                                                        )}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {info.data.map((td) => (
                                                        <tr key={td.id}>
                                                            <td>{td.salary}</td>
                                                            <td>
                                                                {isFormSubmitted
                                                                    ? td.amount
                                                                    : ``}
                                                            </td>
                                                            <td>
                                                                {isFormSubmitted
                                                                    ? td.rate
                                                                    : ``}
                                                            </td>
                                                            <td>
                                                                {isFormSubmitted
                                                                    ? td.liability
                                                                    : ``}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        ))}
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Container>
            </section>
        </Layout>
    );
};

export default TaxCalculator;
