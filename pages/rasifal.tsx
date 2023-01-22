import { BreadCrumb } from "@components/common/BreadCrumb";
import Layout from "@components/Layout";
import { RasifalDetails } from "@components/Rasifal/RasifalDetails";
import React from "react";
import { Container } from "react-bootstrap";

const rasifal = () => {
    return (
        <Layout
            title="Rasifal Homaale"
            description="Homaale is a platform designed to provide service booking solutions to the
            service seekers and business opportunities to various service providing companies by bridging a gap between them. 
             It covers a wide range of services from various industries like Accounting, Gardening,
            Health, Beauty, and many more."
            keywords="homaale, rashifal, nepali-rashifal, today-rashifal, airtasker-nepali,nepali-working-platform,  business, online-business"
        >
            <BreadCrumb currentPage="Rasifal" />
            <section
                id="rasifal-details-section"
                className="rasifal-details-section"
            >
                <Container fluid="xl" className="px-4">
                    <RasifalDetails />
                </Container>
            </section>
        </Layout>
    );
};

export default rasifal;
