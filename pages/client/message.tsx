import { BreadCrumb } from "@components/common/BreadCrumb";
import Layout from "@components/Layout";
import { ContactListSideBar } from "@components/Message/ContactListSidebar";
import { Container } from "react-bootstrap";

export const ClientMessagePage = () => {
    return (
        <Layout
            title="Homaale | Message"
            description="Start a conversation in Homaale with your tasker or client"
            keywords="homaale-message, homaale-client-message, message"
        >
            <Container>
                <BreadCrumb currentPage="Messages" />
                <h4 className="title">Messages</h4>
                <section className="message-page">
                    <ContactListSideBar />
                </section>
            </Container>
        </Layout>
    );
};
export default ClientMessagePage;
