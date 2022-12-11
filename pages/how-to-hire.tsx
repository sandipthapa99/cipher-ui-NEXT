import { BreadCrumb } from "@components/common/BreadCrumb";
import LongSquareImageCard from "@components/common/LongSquareImageCard";
import SquareImageCarousel from "@components/common/SquareImageCarousel";
import GradientBanner from "@components/GradientBanner";
import Layout from "@components/Layout";
import type { NextPage } from "next";
import { Container } from "react-bootstrap";
import { Carousel } from "react-bootstrap";
import {
    browseTalent,
    hireTaskerContent,
    howToHireCarousel,
} from "staticData/howToHire";

const HowToHire: NextPage = () => {
    return (
        <Layout
            title="How To Hire | Homaale"
            description="Search on Talent Marketplace™ for the hourly or fixed-price work you're looking for. 
        Submit a proposal, set your rate, and show how great you'll be.
         Give a little extra by sharing your unique approach and offering a rapport-building interview"
            keywords="how-to-find-tasks, task, task-homaale, airtasker-nepali, nepali-working-platform, homaale-feeback, business, online-business, homaale, hire"
        >
            <Container fluid="xl" className="px-4">
                <section className="how-to-hire">
                    <BreadCrumb currentPage="How To Hire" />

                    <div className="how-to-hire__top-container">
                        <Carousel>
                            {howToHireCarousel &&
                                howToHireCarousel.map((item) => {
                                    return (
                                        <Carousel.Item
                                            key={item.id}
                                            //interval={1000}
                                        >
                                            <SquareImageCarousel
                                                buttonText={item.buttonText}
                                                image={item.image}
                                                title={item.title}
                                                description={item.description}
                                            />
                                        </Carousel.Item>
                                    );
                                })}
                        </Carousel>
                    </div>
                    <div className="how-to-hire__content card-block">
                        {hireTaskerContent &&
                            hireTaskerContent.map((info) => (
                                <LongSquareImageCard
                                    title={info.title}
                                    subtitle={info.subtitle}
                                    image={info.image}
                                    description={info.description}
                                    key={info.id}
                                    buttonText={info.buttonText}
                                    imageOnRight={info.imageOnRight}
                                />
                            ))}
                    </div>
                    <div className="how-to-hire__browse-talent card-block">
                        {browseTalent &&
                            browseTalent.map((info) => (
                                <LongSquareImageCard
                                    title={info.title}
                                    subtitle={info.subtitle}
                                    image={info.image}
                                    description={info.description}
                                    key={info.id}
                                    buttonText={info.buttonText}
                                    imageOnRight={info.imageOnRight}
                                />
                            ))}
                    </div>
                    <div className="how-to-hire__gradient-container">
                        <GradientBanner
                            title="Get started as a Client"
                            subTitle=""
                            image="/discover/main.svg"
                        />
                    </div>
                    <div className="how-to-hire__bottom-container">
                        <h1>Homaale Benefits for you</h1>
                        {/* <p>
                            As the world&apos;s work marketplace, there&apos;s
                            more than one way to use Upwork—and at least one
                            that works for you. From quick project turnarounds
                            to major strategic transformations, businesses of
                            all sizes and ambitions can develop the trusted
                            relationships they need to thrive and grow.
                        </p> */}
                        <figure className="thumbnail-img footer-img">
                            <iframe
                                width="100%"
                                height="100%"
                                src={
                                    "https://www.youtube.com/embed/QIKZaRYg5bA"
                                }
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </figure>
                    </div>
                </section>
            </Container>
        </Layout>
    );
};

export default HowToHire;
