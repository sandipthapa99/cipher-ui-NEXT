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
            <Container fluid="xl" className="px-5">
                <BreadCrumb currentPage="Terms &amp; Conditions" />
                <section className="privacy-policy">
                    <section className="privacy-policy__intro inner-section">
                        {parse(content)}
                    </section>
                </section>
            </Container>
        </Layout>
    );
};
export const getStaticProps: GetStaticProps<{ content: string }> = async () => {
    const { data } = await axiosClient.get<{ content: string }>(
        urls.termsandconditions
    );
    return {
        props: data,
    };
};
export default TermsConditions;
