import Layout from "@components/Layout";
import { useRouter } from "next/router";
import React from "react";
import { Container } from "react-bootstrap";

const ServiceCategoryPage = () => {
    const router = useRouter();
    return (
        <Layout>
            <Container className="py-4">
                <h1>Service Category Page</h1>
                <p>{router.query.category}</p>
            </Container>
        </Layout>
    );
};
export default ServiceCategoryPage;
