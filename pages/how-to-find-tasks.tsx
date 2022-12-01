import AboutCard from "@components/common/AboutCard";
import { BreadCrumb } from "@components/common/BreadCrumb";
import LongSquareImageCard from "@components/common/LongSquareImageCard";
import Layout from "@components/Layout";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import { growBusinessSteps } from "staticData/growBusiness";
import { browseTasks, rules } from "staticData/how-to-find";
const HowToFindTasks = () => {
    return (
        <Layout title="How to find tasks | Homaale">
            <Container fluid="xl" className="px-4">
                <section className="find-tasks">
                    <BreadCrumb currentPage="How to find tasks" />
                    {/* Notable quality section starts  */}
                    <section
                        id="browse-tasks"
                        className="find-tasks__browse-task"
                    >
                        <LongSquareImageCard
                            title="Browse tasks"
                            image="/how-to-find/home.svg"
                            imageOnRight={true}
                            description={browseTasks}
                            homeImage={true}
                        />
                    </section>
                    {/* Notable quality section ends  */}
                    {/* steps section start */}
                    <section className="find-tasks__steps">
                        <h1>How to win more clients?</h1>
                        <Row className="gx-5">
                            {growBusinessSteps &&
                                growBusinessSteps.map((step) => {
                                    return (
                                        <Col
                                            className="steps-col"
                                            sm={6}
                                            md={4}
                                            lg={3}
                                            key={step.id}
                                        >
                                            <AboutCard
                                                cardDescription={
                                                    step.description
                                                }
                                                cardImage={step.image}
                                                cardTitle={step.title}
                                            />
                                        </Col>
                                    );
                                })}
                        </Row>
                    </section>
                    {/* steps secrion end */}
                    <div
                        className="find-tasks__advertisement"
                        id="advertisement"
                    >
                        <figure className="thumbnail-img">
                            <Image
                                src="/exploreservices/gardening.svg"
                                layout="fill"
                                objectFit="cover"
                                alt="earth-image"
                            />
                        </figure>
                    </div>
                    <div className="find-tasks__oppurtunity">
                        <h1>Find your next oppurtunity</h1>
                        <p>
                            Search on Talent Marketplace™ for the hourly or
                            fixed-price work you&apos;re looking for. Submit a
                            proposal, set your rate, and show how great
                            you&apos;ll be. Give a little extra by sharing your
                            unique approach and offering a rapport-building
                            interview.
                        </p>
                        <iframe
                            src={"https://www.youtube.com/embed/QIKZaRYg5bA"}
                            frameBorder="0"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            title="video"
                            height={450}
                            width="100%"
                        />
                    </div>
                    <div className="find-tasks__hire-content card-block">
                        <LongSquareImageCard
                            image="/howtohire/notes.svg"
                            title="How payment works"
                            subtitle="Whether you’re paid , all the work you complete comes with payment protection."
                            descTitle="No fees until you complete your work
                            Our service fees are taken as a percentage of your earnings. We charge you based on lifetime earnings with each client:"
                            description={rules}
                            imageOnRight={false}
                            homeImage={false}
                        />
                    </div>
                </section>
            </Container>
        </Layout>
    );
};
export default HowToFindTasks;
