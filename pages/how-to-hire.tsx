import { BreadCrumb } from "@components/common/BreadCrumb";
import LongSquareImageCard from "@components/common/LongSquareImageCard";
import SquareImageCarousel from "@components/common/SquareImageCarousel";
import GradientBanner from "@components/GradientBanner";
import Layout from "@components/Layout";
import type { NextPage } from "next";
import Image from "next/image";
import { Container } from "react-bootstrap";
import { Carousel } from "react-bootstrap";
import {
    browseTalent,
    hireTaskerContent,
    howToHireCarousel,
} from "staticData/howToHire";

const HowToHire: NextPage = () => {
    return (
        <Layout title="How To Hire | Homaale">
            <Container fluid="xl" className="px-5">
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
                            title="A client tasks are quickly finished 
                            when searched through Homaale"
                            subTitle="“Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500. "
                            image="/discover/main.svg"
                        />
                    </div>
                    <div className="how-to-hire__bottom-container">
                        <h1>Ways to Use Homaale to Achieve Your Goals</h1>
                        <p>
                            As the world&apos;s work marketplace, there&apos;s
                            more than one way to use Upwork—and at least one
                            that works for you. From quick project turnarounds
                            to major strategic transformations, businesses of
                            all sizes and ambitions can develop the trusted
                            relationships they need to thrive and grow.
                        </p>
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
