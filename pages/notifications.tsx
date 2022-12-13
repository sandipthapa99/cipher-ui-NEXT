import { BreadCrumb } from "@components/common/BreadCrumb";
import Layout from "@components/Layout";
import GetNotifications from "@components/notifications/GetNotifications";
import React from "react";
import { Container } from "react-bootstrap";

function Notifications() {
    return (
        <Layout
            title="Notifications | Homaale"
            description="Homaale is a platform designed to provide service booking solutions to the
            service seekers and business opportunities to various service providing companies by bridging a gap between them. 
             It covers a wide range of services from various industries like Accounting, Gardening,
            Health, Beauty, and many more."
            keywords="homaale,  airtasker-nepali,nepali-working-platform, homaale-feeback, business, online-business"
        >
            <Container fluid="xl" className="px-4">
                <BreadCrumb currentPage="Notifications" />
                <GetNotifications />
            </Container>
        </Layout>
    );
}

export default Notifications;
