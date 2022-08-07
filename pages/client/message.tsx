import Breadcrum from "@components/common/Breadcrum";
import Layout from "@components/Layout";
import { ContactListSideBar } from "@components/Message/ContactListSidebar";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { Container } from "react-bootstrap";
import type { Contact } from "staticData/messages";
import { DUMMY_CONTACTS } from "staticData/messages";

export const ClientMessagePage = ({
    contacts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <Layout>
            <Container>
                <Breadcrum currentPage="Messages" />
                <h4 className="title">Messages</h4>
                <ContactListSideBar contacts={contacts} />
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