import { BreadCrumb } from "@components/common/BreadCrumb";
import Layout from "@components/Layout";
import urls from "constants/urls";
import parse from "html-react-parser";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { Container } from "react-bootstrap";
import { axiosClient } from "utils/axiosClient";

const PrivacyPolicy: NextPage<
    InferGetStaticPropsType<typeof getStaticProps>
> = ({ content }) => {
    return (
        <Layout
            title="Privacy Policy | Homaale"
            description="Homaale is a platform designed to provide service booking solutions to the
            service seekers and business opportunities to various service providing companies by bridging a gap between them. 
             It covers a wide range of services from various industries like Accounting, Gardening,
            Health, Beauty, and many more."
            keywords="homaale, homaale-privacy-policy, airtasker-nepali,nepali-working-platform, homaale-feeback, business, online-business"
        >
            <BreadCrumb currentPage="Privacy Policy" />
            <Container fluid="xl">
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
            urls.privacyPolicy
        );
        return {
            props: data,
        };
    } catch {
        return { props: { content: "" } };
    }
};
export default PrivacyPolicy;
