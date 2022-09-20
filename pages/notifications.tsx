import { BreadCrumb } from "@components/common/BreadCrumb";
import Layout from "@components/Layout";
import GetNotifications from "@components/notifications/GetNotifications";
import React from "react";
import { Container } from "react-bootstrap";

function Notifications() {
    return (
        <Layout title="Notifications | Cipher">
            <Container fluid="xl" className="px-5">
                <BreadCrumb currentPage="Notifications" />
                <GetNotifications />
            </Container>
        </Layout>
    );
}

export default Notifications;
