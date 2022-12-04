import { BreadCrumb } from "@components/common/BreadCrumb";
import CommunityGuidelineCard from "@components/common/CommunityGuidelineCard";
import LongSquareImageCard from "@components/common/LongSquareImageCard";
import Layout from "@components/Layout";
import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import Marquee from "react-fast-marquee";
import { taskerServices } from "staticData/taskerMarketPlace";
import type { BrandValueProps } from "types/brandValueProps";
import type { FAQValueProps } from "types/faqValueProps";
import { axiosClient } from "utils/axiosClient";

const waysToHire = [
    {
        id: "0",
        title: "Meet with your recruiter",

        desc: "Give us a few details about your project and set up a time to talk with your recruiter.",
    },
    {
        id: "1",

        title: "Receive a shortlist",
        desc: "Posting a task or getting your work done requires only few easy clicks.",
    },
    {
        id: "2",
        title: "Select and hire",

        desc: "Choose the best fit for your team.",
    },
];

const TaskerMarketPlace: NextPage<{
    trustedPartnerData: BrandValueProps;
    faqData: FAQValueProps;
}> = ({ trustedPartnerData, faqData }) => {
    return (
        <Layout title="Tasker Marketplace | Homaale">
            <BreadCrumb currentPage="Tasker Marketplace" />
            <section className="tasker-marketplace">
                <Container fluid="xl" className="px-4">
                    <div className="tasker-marketplace__top-container">
                        <LongSquareImageCard
                            title="Post a job today, hire tomorrow"
                            image="/taskermarketplace/girl.svg"
                            description="Connect with talent that gets you, and hire them to take your business to the next level."
                            homeImage={true}
                            buttonText="Browse Talents"
                            imageOnRight={false}
                        />
                    </div>
                    <div className="tasker-marketplace__ways">
                        <LongSquareImageCard
                            title="Easy way to hire talents"
                            image="/taskermarketplace/search.svg"
                            imageOnRight={true}
                            description={waysToHire}
                        />
                    </div>
                    <div className="tasker-marketplace__services">
                        <h1>What you&apos;ll get?</h1>
                        <Row className="gx-5">
                            {taskerServices &&
                                taskerServices.map((info) => (
                                    <Col
                                        className="guideline-col"
                                        key={info.id}
                                        lg={4}
                                        md={6}
                                        sm={12}
                                    >
                                        <CommunityGuidelineCard
                                            cardTitle={info.cardTitle}
                                            cardDescription={
                                                info.cardDescription
                                            }
                                            cardImage={info.cardImage}
                                        />
                                    </Col>
                                ))}
                        </Row>
                    </div>
                    <h1>Trusted Partners</h1>
                </Container>
            </section>
            <section
                id="trusted-brand-section"
                className="trusted-brand-section"
            >
                <Marquee gradient={true} className="marquee" speed={40}>
                    {trustedPartnerData?.map((value, key) => (
                        <Link href={value?.redirect_url} key={key}>
                            <li className="light">
                                <a>
                                    {value?.logo && (
                                        <figure>
                                            <Image
                                                src={value?.logo}
                                                alt={value?.alt_text}
                                                layout="fill"
                                                objectFit="contain"
                                            />
                                        </figure>
                                    )}
                                </a>
                            </li>
                        </Link>
                    ))}
                </Marquee>
            </section>
            <section className="tasker-marketplace__faq">
                <Container fluid="xl" className="px-4">
                    <h1>Frequently Asked Questions</h1>
                    <Accordion flush>
                        {(faqData?.result ?? []).length > 0
                            ? faqData?.result?.map((value, key) => (
                                  <Accordion.Item
                                      eventKey={key.toString()}
                                      key={key}
                                  >
                                      <Accordion.Header>
                                          {value?.title}
                                      </Accordion.Header>
                                      <Accordion.Body>
                                          <p>{value?.content}</p>
                                      </Accordion.Body>
                                  </Accordion.Item>
                              ))
                            : "No FAQ datas found"}
                    </Accordion>
                </Container>
            </section>
        </Layout>
    );
};

export default TaskerMarketPlace;

export const getStaticProps: GetStaticProps = async () => {
    try {
        const { data: trustedPartnerData } = await axiosClient.get(
            "/landingpage/trusted-partner/"
        );
        const { data: faqData } = await axiosClient.get("/support/faq/");
        return {
            props: {
                trustedPartnerData,
                faqData,
            },
            revalidate: 10,
        };
    } catch (err: any) {
        return {
            props: {
                trustedPartnerData: [],
                faqData: [],
            },
            revalidate: 10,
        };
    }
};
