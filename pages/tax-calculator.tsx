import { BreadCrumb } from "@components/common/BreadCrumb";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import SelectInputField from "@components/common/SelectInputField";
import Layout from "@components/Layout";
import { faCircleQuestion } from "@fortawesome/pro-regular-svg-icons";
import { Form, Formik } from "formik";
import type { NextPage } from "next";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { TaxCalculatorFormData } from "utils/formData";
import taxCalculatorSchema from "utils/formValidation/taxCalculatorFormValidation";
import { isSubmittingClass } from "utils/helpers";
import { maritalStatus, salaryType } from "utils/options";

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
                <Container fluid="xl" className="px-5">
                    <BreadCrumb currentPage="Tax Calculator" />
                    <div className="card-block">
                        <div className="header">
                            <h1>Tax Calculator</h1>
                        </div>
                        <div className="content">
                            <Row className="gx-5">
                                <Col md={6}>
                                    <div className="tax-calculator__header">
                                        <h2>
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
                                            onSubmit={async (values) => {
                                                console.log("values", values);
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
                                                                    name="maritalStatus"
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
                                                                    name="salaryType"
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
                                                            name="festivalBonus"
                                                            type="text"
                                                            //   error={
                                                            //     errors.festivalBonus
                                                            //}
                                                            touch={
                                                                touched.festivalBonus
                                                            }
                                                            haveIcon={true}
                                                            inputIcon={
                                                                faCircleQuestion
                                                            }
                                                            placeHolder="Festival Bonus"
                                                        />

                                                        <InputField
                                                            type="text"
                                                            name="allowances"
                                                            placeHolder="Allowances"
                                                            //   error={
                                                            //     errors.allowances
                                                            //}
                                                            touch={
                                                                touched.allowances
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
                                                            name="providentFund"
                                                            //   error={
                                                            //     errors.providentFund
                                                            //}
                                                            placeHolder="Provident Fund"
                                                            touch={
                                                                touched.providentFund
                                                            }
                                                            haveIcon={true}
                                                            inputIcon={
                                                                faCircleQuestion
                                                            }
                                                        />

                                                        <InputField
                                                            type="text"
                                                            name="investmentTrust"
                                                            placeHolder="Investment Trust"
                                                            //   error={
                                                            //     errors.investmentTrust
                                                            //}
                                                            touch={
                                                                touched.investmentTrust
                                                            }
                                                            haveIcon={true}
                                                            inputIcon={
                                                                faCircleQuestion
                                                            }
                                                        />

                                                        <InputField
                                                            type="text"
                                                            placeHolder="Insurance"
                                                            name="insurance"
                                                            //   error={
                                                            //     errors.insurance
                                                            //}
                                                            touch={
                                                                touched.insurance
                                                            }
                                                            haveIcon={true}
                                                            inputIcon={
                                                                faCircleQuestion
                                                            }
                                                        />

                                                        <InputField
                                                            type="text"
                                                            name="medicalInsurance"
                                                            placeHolder="Medical Insurance"
                                                            //   error={
                                                            //     errors.medicalInsurance
                                                            //}
                                                            touch={
                                                                touched.medicalInsurance
                                                            }
                                                            haveIcon={true}
                                                            inputIcon={
                                                                faCircleQuestion
                                                            }
                                                        />
                                                    </div>
                                                    <div className="buttons">
                                                        <Row>
                                                            <Col md={6}>
                                                                <FormButton
                                                                    name="Reset"
                                                                    className="btn close-btn"
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
                                                            <td>{td.amount}</td>
                                                            <td>{td.rate}</td>
                                                            <td>
                                                                {td.liability}
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
