import Breadcrum from "@components/common/Breadcrum";
import LongSquareImageCard from "@components/common/LongSquareImageCard";
import { SearchInputField } from "@components/common/SearchInputField";
import { TeamMembersCard } from "@components/common/TeamMembersCard";
import Layout from "@components/Layout";
import type { NextPage } from "next";
import { Col, Container, Row } from "react-bootstrap";
import {
    hireInNepalBrowseTalent,
    topSkillsInNepal,
} from "staticData/hireInNepal";
import { DUMMY_TASKS } from "types/tasks";
import searchValidationSchema from "utils/formValidation/searchValidation";
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
                        <Row>
                            <Col md={4}>
                                <SearchInputField
                                    validationSchema={searchValidationSchema}
                                    placeholder="Search for a Tasker"
                                />
                            </Col>
                        </Row>

                        <Row className="g-5">
                            {DUMMY_TASKS.map((item, index) => (
                                <Col lg={4} md={6} sm={12} key={index}>
                                    <TeamMembersCard task={item} />
                                </Col>
                            ))}
                        </Row>
                        <Row className="g-5 pt-5">
                            {DUMMY_TASKS.map((item, index) => (
                                <Col lg={4} md={6} sm={12} key={index}>
                                    <TeamMembersCard task={item} />
                                </Col>
                            ))}
                        </Row>
                    </div>
                    <div className="hire-in-nepal__top-skills">
                        <h1>Top skills in Nepal</h1>
                        <Row>
                            {topSkillsInNepal &&
                                topSkillsInNepal.map((skill) => (
                                    <Col md={3} key={skill.id}>
                                        <p>{skill.name}</p>
                                    </Col>
                                ))}
                        </Row>
                    </div>
                </section>
            </Container>
        </Layout>
    );
};

export default HireInNepal;
