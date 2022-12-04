import { BreadCrumb } from "@components/common/BreadCrumb";
import Layout from "@components/Layout";
import { RasifalDetails } from "@components/Rasifal/RasifalDetails";
import React from "react";
import { Container } from "react-bootstrap";

const rasifal = () => {
    return (
        <Layout title="Rasifal Homaale">
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
