import { BreadCrumb } from "@components/common/BreadCrumb";
import Layout from "@components/Layout";
import { ContactListSideBar } from "@components/Message/ContactListSidebar";
import type { GetStaticProps } from "next";
import { Container } from "react-bootstrap";
import type { Contact } from "staticData/messages";
import { DUMMY_CONTACTS } from "staticData/messages";

export const ClientMessagePage = () => {
    return (
        <Layout>
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
export const getStaticProps: GetStaticProps<{ contacts: Contact[] }> = () => {
    return {
        props: {
            contacts: DUMMY_CONTACTS,
        },
    };
};
export default ClientMessagePage;
