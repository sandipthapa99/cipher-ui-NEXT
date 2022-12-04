import { BreadCrumb } from "@components/common/BreadCrumb";
import Layout from "@components/Layout";
import urls from "constants/urls";
import parse from "html-react-parser";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { Container } from "react-bootstrap";
import { axiosClient } from "utils/axiosClient";

const TermsConditions: NextPage<
    InferGetStaticPropsType<typeof getStaticProps>
> = ({ content }) => {
    return (
        <Layout title="Terms &amp; Conditions | Homaale">
            <Container fluid="xl" className="px-4">
                <BreadCrumb currentPage="Terms &amp; Conditions" />
                <section className="privacy-policy">
                    <section className="privacy-policy__intro inner-section">
                        {content && parse(content)}
                    </section>
                </section>
            </Container>
        </Layout>
    );
};
export const getStaticProps: GetStaticProps<{ content: string }> = async () => {
    try {
        const { data } = await axiosClient.get<{ content: string }>(
            urls.termsandconditions
        );
        return {
            props: data,
        };
    } catch {
        return { props: { content: "" } };
    }
};
export default TermsConditions;
