import Breadcrum from "@components/common/Breadcrum";
import Layout from "@components/Layout";
import type { NextPage } from "next";
import Link from "next/link";
import { Button, Col, Container, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import {
    exampleSteps,
    taxDeductionSlab,
    taxDeductionSteps,
    taxRegime,
} from "staticData/tax";

const TaxDeduction: NextPage = () => {
    return (
        <Layout title="Tax-Deduction | Cipher">
            <section className="tax-deduction">
                <Container fluid="xl">
                    <Breadcrum currentPage="Tax Deduction" />
                    <div className="tax-deduction__header">
                        <h1 className="text-center">Tax Deduction</h1>
                    </div>
                    <div className="tax-deduction__calculation">
                        <div className="intro">
                            <h1>What is Tax Deduction?</h1>
                            <p>
                                Tax Deducted at Source or TDS is the amount
                                which is deducted from the income of an
                                individual by an authorised deductor and
                                deposited to the IT department. The TDS can be
                                calculated by following a few simple steps. How
                                do I calculate TDS on my salary? While the basic
                                salary is fully taxable according to respective
                                tax bracket, some exemptions are available for
                                payments made as allowances and perks. You can
                                calculate TDS on your income by following the
                                below steps:-
                            </p>
                        </div>
                        <div className="steps-container">
                            <h1>How do I calculate TDS on my salary?</h1>
                            <p>
                                While the basic salary is fully taxable
                                according to respective tax bracket, some
                                exemptions are available for payments made as
                                allowances and perks. You can calculate TDS on
                                your income by following the below steps:-
                            </p>
                            <div className="steps">
                                <ol>
                                    {taxDeductionSteps &&
                                        taxDeductionSteps.map((step, i) => (
                                            <li key={i}>{step}</li>
                                        ))}
                                </ol>
                            </div>
                            <div className="example-container">
                                <p>
                                    Example <br />
                                    As per the steps outlined above, let&apos;s
                                    consider a numeric example for better
                                    understanding.
                                </p>
                                <div className="steps">
                                    <ol>
                                        {exampleSteps &&
                                            exampleSteps.map((step) => (
                                                <div
                                                    className="type"
                                                    key={step.id}
                                                >
                                                    <li>{step.name}</li>
                                                    <p>{step.description}</p>
                                                </div>
                                            ))}
                                        <div className="step-7">
                                            <li>Step (7)</li>
                                            <div className="description">
                                                Finding out your tax slab Your
                                                final tax <br /> Your final
                                                breakup according to income
                                                slabs listed by the IT
                                                department is as follows:
                                                <br />
                                                <p>
                                                    Therefore, the final TDS to
                                                    be deducted on your yearly
                                                    income is Rs.25,000 +
                                                    Rs.26,600, which comes to
                                                    Rs.51,600 for current
                                                    year&apos;s income, or
                                                    Rs.4,300 per month for the
                                                    current fiscal.
                                                </p>
                                            </div>
                                        </div>
                                    </ol>
                                </div>
                            </div>
                        </div>
                        <div className="table">
                            {taxDeductionSlab.map((info) => (
                                <Table bordered responsive key={info.id}>
                                    <thead>
                                        <tr>
                                            {info.heading.map((th) => (
                                                <th key={th.id}>{th.name}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {info.data.map((td) => (
                                            <tr key={td.id}>
                                                <td>{td.taxSlab}</td>
                                                <td>{td.tdsDeduction}</td>
                                                <td>{td.taxPayable}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            ))}
                        </div>
                    </div>
                    <div className="tax-deduction__tax-regime">
                        <div className="header">
                            <h1>New Income Tax Regime for Individuals</h1>
                            <p>
                                As per the latest announcements made by Finance
                                Minister Nirmala Sitharaman for the Budget of
                                Financial Year 2020-21, a new tax regime has
                                been introduced. Based on the new tax regime,
                                the rates of charging the income tax have been
                                reduced. However, the catch is that under the
                                new regime, taxpayers will not be able to avail
                                the benefits of the usual deductions and
                                allowances such as HRA, standard deductions,
                                etc.
                            </p>
                            <div className="table-content">
                                <p>
                                    The tax rates as per the new regime are
                                    listed below:
                                </p>
                                {taxRegime.map((info) => (
                                    <Table bordered responsive key={info.id}>
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
                                                    <td>{td.taxSlab}</td>
                                                    <td>{td.taxRate}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                ))}
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </Layout>
    );
};

export default TaxDeduction;
