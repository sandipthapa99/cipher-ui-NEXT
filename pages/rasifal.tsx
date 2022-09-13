import { BreadCrumb } from "@components/common/BreadCrumb";
import Layout from "@components/Layout";
import { RasifalDetails } from "@components/Rasifal/RasifalDetails";
import React from "react";
import { Container } from "react-bootstrap";

const rasifal = () => {
    return (
        <Layout title="Rasifal Cipher">
            <BreadCrumb currentPage="Rasifal" />
            <section
                id="rasifal-details-section"
                className="rasifal-details-section"
            >
                <Container fluid="xl" className="px-5">
                    <RasifalDetails />
                </Container>
            </section>
        </Layout>
    );
};

export default rasifal;
