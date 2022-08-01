import Breadcrum from "@components/common/Breadcrum";
import LongSquareImageCard from "@components/common/LongSquareImageCard";
import Layout from "@components/Layout";
import type { NextPage } from "next";
import { Container } from "react-bootstrap";
import { hireInNepalBrowseTalent } from "staticData/hireInNepal";

const HireInNepal: NextPage = () => {
    return (
        <Layout title="Hire in Nepal | Cipher">
            <Container fluid="xl">
                <section className="hire-in-nepal">
                    <Breadcrum currentPage="Hire in Nepal" />

                    <div className="hire-in-nepal__top-container">
                        {hireInNepalBrowseTalent &&
                            hireInNepalBrowseTalent.map((info) => (
                                <LongSquareImageCard
                                    title={info.title}
                                    image={info.image}
                                    description={info.description}
                                    key={info.id}
                                    homeImage={true}
                                    buttonText={info.buttonText}
                                    imageOnRight={info.imageOnRight}
                                />
                            ))}
                    </div>
                    <div className="hire-in-nepal__hire-tasker">
                        <h1>Hire a tasker from Nepal</h1>
                        <p>Connect with a freelancer from Nepal</p>
                    </div>
                </section>
            </Container>
        </Layout>
    );
};

export default HireInNepal;
