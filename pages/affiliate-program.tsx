import AnchorButton from "@components/common/AnchorButton";
import { BreadCrumb } from "@components/common/BreadCrumb";
import CipherCard from "@components/common/CipherCard";
import LongSquareImageCard from "@components/common/LongSquareImageCard";
import Layout from "@components/Layout";
import Cookies from "js-cookie";
import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import { Table } from "react-bootstrap";
import Marquee from "react-fast-marquee";
import { affiliateGetStarted } from "staticData/affiliate";
import type { BrandValueProps } from "types/brandValueProps";
import type { FAQValueProps } from "types/faqValueProps";
import { axiosClient } from "utils/axiosClient";

const AffiliateProgram: NextPage<{
    trustedPartnerData: BrandValueProps;
    faqData: FAQValueProps;
}> = ({ trustedPartnerData, faqData }) => {
    console.log(
        "🚀 ~ file: affiliate-program.tsx ~ line 25 ~ trustedPartnerData",
        trustedPartnerData
    );
    const accessToken = Cookies.get("access");

    return (
        <Layout title="Affiliate Program | Cipher">
            <section className="affiliate-hero-section">
                <BreadCrumb currentPage="Affiliate Program" />
                <Container className="px-5" fluid="xl">
                    <Row className="gx-5">
                        <Col
                            md={5}
                            className="d-flex align-items-center justify-content-center"
                        >
                            <figure className="thumbnail-img d-none d-md-block">
                                <Image
                                    src="/illustrations/affiliate-hero.svg"
                                    layout="fill"
                                    objectFit="cover"
                                    alt="affiliate-hero-img"
                                />
                            </figure>
                        </Col>
                        <Col
                            md={7}
                            className="d-flex align-items-center justify-content-center"
                        >
                            <div className="affiliate-hero-section__text-wrapper">
                                <h1>Welcome to our affilate program</h1>
                                <p>
                                    Become a Cipher affiliate and earn a 20%
                                    monthly commission. Join today to get a
                                    signup bonus and boost your earnings with
                                    one of the top affiliate software platforms.
                                </p>
                                <ul>
                                    <li>24/7 customer support</li>
                                    <li>No setup fee</li>
                                    <li>No credit card required</li>
                                    <li>No credit card required</li>
                                    <li>Cancel anytime</li>
                                </ul>

                                {accessToken !== undefined ? (
                                    <AnchorButton
                                        className={"px-5"}
                                        href={"/service/"}
                                        varient={"secondary"}
                                    >
                                        {"Explore Services"}
                                    </AnchorButton>
                                ) : (
                                    <AnchorButton
                                        className={"px-5"}
                                        href={"/signup"}
                                        varient={"secondary"}
                                    >
                                        {"Join Now"}
                                    </AnchorButton>
                                )}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section
                id="trusted-brand-section"
                className="trusted-brand-section"
            >
                {/* <Container fluid="xl" className="px-5"> */}
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
                                            ></Image>
                                        </figure>
                                    )}
                                </a>
                            </li>
                        </Link>
                    ))}
                </Marquee>
                {/* </Container> */}
            </section>
            <Container className="px-5" fluid="xl">
                <section className="affiliate-get-started-section">
                    <h1 className="heading-title">Get started</h1>
                    <h2>It&apos;s easy to </h2>
                    <Row className="gx-5">
                        {affiliateGetStarted &&
                            affiliateGetStarted.map((card) => {
                                return (
                                    <Col md={4} key={card.id}>
                                        <CipherCard
                                            thumbnailImg={card.thumbnailImg}
                                            title={card.title}
                                            description={card.description}
                                            redirectTo={""}
                                        />
                                    </Col>
                                );
                            })}
                    </Row>
                </section>

                <section className="affiliate-how-it-works">
                    <h1 className="heading-title">How does it work?</h1>
                    <h2>
                        We handle everything &#8211; hosting the roducts,
                        handling customer service, and you get paid for
                        referring visitors to our websites.
                    </h2>
                    <Row className="gx-5">
                        <Col md={6}>
                            <div className="table-card">
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>Referred sales</th>
                                            <th>Commission level</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <ul>
                                                    <li>All sales</li>
                                                    <li>Trial upgrades</li>
                                                    <li>
                                                        Recurring commissions
                                                    </li>
                                                </ul>
                                            </td>
                                            <td>
                                                <ul>
                                                    <li>20%</li>
                                                    <li>20%</li>
                                                    <li>20%</li>
                                                </ul>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="right-text">
                                <h1 className="heading-title">
                                    How much can you make?
                                </h1>
                                <p>
                                    Our affiliate program is easy to promote and
                                    has a high conversion rate. Approximately
                                    one out of every 66 visitors buys our
                                    product, making it a surefire way to earn
                                    money.
                                </p>
                            </div>
                        </Col>
                    </Row>
                </section>

                <section className="why-cipher">
                    <LongSquareImageCard
                        title="Why Cipher"
                        subtitle="The world's work marketplace"
                        image="/affiliate/why-cipher.png"
                        description="Businesses and independent professionals from
                                around the world come to Upwork to grow their
                                businesses, take control of their careers, and
                                create meaningful work relationships."
                        buttonText="See How"
                        imageOnRight={false}
                    />
                </section>

                <section className="affiliate-faqs">
                    <h1>Frequently asked questions</h1>
                    {(faqData?.result ?? []).length > 0
                        ? faqData?.result?.map((value, key) => (
                              <Accordion.Item
                                  eventKey={key.toString()}
                                  key={key}
                              >
                                  <Accordion.Header>
                                      {value.title}
                                  </Accordion.Header>
                                  <Accordion.Body>
                                      <p>{value.content}</p>
                                  </Accordion.Body>
                              </Accordion.Item>
                          ))
                        : "No FAQ datas found"}
                </section>
            </Container>
        </Layout>
    );
};
export default AffiliateProgram;

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
