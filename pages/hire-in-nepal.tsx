import { BreadCrumb } from "@components/common/BreadCrumb";
import LongSquareImageCard from "@components/common/LongSquareImageCard";
import { SearchInputField } from "@components/common/SearchInputField";
import { TeamMembersCard } from "@components/common/TeamMembersCard";
import Layout from "@components/Layout";
import { TextInput } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import urls from "constants/urls";
import { useTaskers } from "hooks/tasker/use-taskers";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
    hireInNepalBrowseTalent,
    topSkillsInNepal,
} from "staticData/hireInNepal";

const HireInNepal: NextPage = () => {
    const [search, setSearch] = useState("");
    const searchQuery = `search=${search}&country=Nepal`;

    const { data: taskerPages } = useTaskers(searchQuery);

    const taskersInNepal = taskerPages?.pages.map((page) => page.result).flat();

    console.log("taskers in nepal", taskersInNepal);
    return (
        <Layout title="Hire in Nepal | Homaale">
            <Container fluid="xl" className="px-5">
                <section className="hire-in-nepal">
                    <BreadCrumb currentPage="Hire in Nepal" />

                    <div className="__top-container">
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
                                {/* <SearchInputField
                                    validationSchema={searchValidationSchema}
                                    placeholder="Search for a Tasker"
                                
                                /> */}
                                <TextInput
                                    placeholder="Search for a Tasker"
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.currentTarget.value)
                                    }
                                />
                            </Col>
                        </Row>

                        {/* <Row className="g-5">
                            {DUMMY_TASKS.map((item, index) => (
                                <Col lg={4} md={6} sm={12} key={index}>
                                    <TeamMembersCard
                                        image={item?.user?.profileImage}
                                        name={item?.user?.username}
                                        speciality={item?.user?.category}
                                        rating={item?.rating?.average}
                                        happyClients={item?.likes}
                                        awardPercentage={item?.rewardPercentage}
                                        location={item?.user?.location}
                                        distance={"2 km"}
                                        bio={item?.user?.bio}
                                        charge={item?.price}
                                        tasker={""}
                                    />
                                </Col>
                            ))}
                        </Row> */}
                        <Row className="g-5 pt-5">
                            {taskersInNepal?.map((item, index: number) => (
                                <Col lg={4} md={6} sm={12} key={index}>
                                    <TeamMembersCard
                                        image={item?.profile_image}
                                        name={
                                            item?.user?.first_name +
                                            item?.user?.middle_name +
                                            item?.user?.last_name
                                        }
                                        speciality={item?.designation}
                                        rating={item?.rating?.user_rating_count}
                                        happyClients={
                                            item?.stats?.happy_clients
                                        }
                                        awardPercentage={
                                            item?.stats?.success_rate
                                        }
                                        location={item?.country.name}
                                        distance={""}
                                        bio={item?.bio}
                                        charge={item?.hourly_rate}
                                        tasker={item?.user?.id}
                                        isTasker={true}
                                        currency={item?.charge_currency?.symbol}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </div>
                    <div className="hire-in-nepal__top-skills">
                        <h1>Top skills in Nepal</h1>
                        <Row className="gx-5">
                            {topSkillsInNepal &&
                                topSkillsInNepal.map((skill) => (
                                    <Col md={3} sm={6} xs={6} key={skill.id}>
                                        <p>{skill.name}</p>
                                    </Col>
                                ))}
                        </Row>
                    </div>
                    <div className="hire-in-nepal__bottom-container">
                        <LongSquareImageCard
                            title="An employee takes home 10% more with Homaale Payroll"
                            image="/hireinnepal/plant.svg"
                            imageOnRight={true}
                            description="Choosing Homaale as your single provider of HR, payroll, recruitment and learning solutions will help you attract, engage and retain workers more effectively"
                        />
                    </div>
                </section>
            </Container>
        </Layout>
    );
};

export default HireInNepal;
