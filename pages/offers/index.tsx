import { BreadCrumb } from "@components/common/BreadCrumb";
import Layout from "@components/Layout";
import { useRouter } from "next/router";
import React from "react";
import { Container, Row } from "react-bootstrap";

const Offers = () => {
    const router = useRouter();

    return (
        <Layout title="Cipher -offers">
            <section className="recommend">
                <Container fluid="xl" className="px-5">
                    <BreadCrumb currentPage={"Offers"} />
                    <h2>Recommend</h2>
                </Container>
            </section>
        </Layout>
    );
};

export default Offers;
