import Breadcrum from "@components/common/Breadcrum";
import Layout from "@components/Layout";
import { Col, Container, Row } from "react-bootstrap";

const Contact = () => {
    return (
        <Layout
            title="Contact Us | Cipher">
            <section className="contact-page-header">
                <Breadcrum currentPage="Contact Us" />
                <div className="contact-page-header__description">
                    <Container>
                        <h1>Contact Us</h1>
                        <h2>With everything &amp; anything you&apos;re confused about</h2>
                    </Container>
                </div>
            </section>

        </Layout>
    )
}
export default Contact;