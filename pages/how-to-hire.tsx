import Breadcrum from "@components/common/Breadcrum";
import LongSquareImageCard from "@components/common/LongSquareImageCard";
import SquareImageCarousel from "@components/common/SquareImageCarousel";
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
        <Layout title="How To Hire | Cipher">
            <Container fluid="xl">
                <section className="how-to-hire">
                    <Breadcrum currentPage="How To Hire" />

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
                    <div className="how-to-hire__bottom-container">
                        <h1>Ways to Use Cipher to Achieve Your Goals</h1>
                        <p>
                            As the world&apos;s work marketplace, there&apos;s
                            more than one way to use Upwork—and at least one
                            that works for you. From quick project turnarounds
                            to major strategic transformations, businesses of
                            all sizes and ambitions can develop the trusted
                            relationships they need to thrive and grow.
                        </p>
                        <figure className="thumbnail-img footer-img">
                            <Image
                                src="/howitworks/economic.svg"
                                layout="fill"
                                objectFit="cover"
                                alt="economic-image"
                            />
                        </figure>
                    </div>
                </section>
            </Container>
        </Layout>
    );
};

export default HowToHire;
