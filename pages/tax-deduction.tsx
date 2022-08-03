import Breadcrum from "@components/common/Breadcrum";
import Layout from "@components/Layout";
import { NextPage } from "next";
import Link from "next/link";
import { Button, Col, Container, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";

const TaxDeduction: NextPage = () => {
    return (
        <Layout title="Tax-Deduction | Cipher">
            <section className="tax-deduction ">
                <Container fluid="xl">
                    <Breadcrum currentPage="Tax Deduction" />
                </Container>
            </section>
        </Layout>
    );
};

export default TaxDeduction;
