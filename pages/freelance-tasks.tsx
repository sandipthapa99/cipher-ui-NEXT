import { BreadCrumb } from "@components/common/BreadCrumb";
import LongSquareImageCard from "@components/common/LongSquareImageCard";
import { SearchInputField } from "@components/common/SearchInputField";
import ServiceCard from "@components/common/ServiceCard";
import SquareImageCarousel from "@components/common/SquareImageCarousel";
import Layout from "@components/Layout";
import { useQuery } from "@tanstack/react-query";
import { useData } from "hooks/use-data";
import type { NextPage } from "next";
import { Carousel, Col, Container, Row } from "react-bootstrap";
import { freelanceTasksCarousel } from "staticData/freelanceTasks";
import type { ServicesValueProps } from "types/serviceCard";
import { axiosClient } from "utils/axiosClient";
import searchValidationSchema from "utils/formValidation/searchValidation";

export interface TopSkill {
    id: number;
    skills: string;
    country: string;
}
export const useTopSkills = () => {
    return useQuery(
        ["top-skills"],
        () =>
            axiosClient
                .get<{ result: TopSkill[] }>(
                    "/task/cms/top-skills/?country=Nepal"
                )
                .then((response) => response.data.result),
        { initialData: [] }
    );
};

const FreelanceTasks: NextPage = () => {
    const { data: topSkillsInNepal } = useTopSkills();
    const { data: servicesData } = useData<ServicesValueProps>(
        ["all-services"],
        "/task/service/"
    );
    return (
        <Layout title="Freelance Tasks | Homaale">
            <Container fluid="xl" className="px-4">
                <section className="freelance-tasks">
                    <BreadCrumb currentPage="Freelance Tasks" />

                    <div className="freelance-tasks__top-container">
                        <Carousel>
                            {freelanceTasksCarousel &&
                                freelanceTasksCarousel.map((item) => {
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
                    <div className="freelance-tasks__hire-tasker">
                        <h1>Select task of your choice</h1>
                        <p>Connect with a freelancer from Nepal</p>
                        <Row>
                            <Col md={4}>
                                <SearchInputField
                                    validationSchema={searchValidationSchema}
                                    placeholder="Search for a Tasker"
                                />
                            </Col>
                        </Row>
                    </div>
                    <Row className="gx-5">
                        <h4 className="task-header">Freelancing Tasks</h4>
                        {servicesData &&
                            servicesData?.data?.result?.map((service) => {
                                return (
                                    <Col sm={6} md={4} lg={3} key={service.id}>
                                        <ServiceCard serviceCard={service} />
                                    </Col>
                                );
                            })}
                    </Row>
                    <Row className="gx-5">
                        {servicesData &&
                            servicesData?.data?.result?.map((service) => {
                                return (
                                    <Col sm={6} md={4} lg={3} key={service.id}>
                                        <ServiceCard serviceCard={service} />
                                    </Col>
                                );
                            })}
                    </Row>
                    <Row className="gx-5">
                        {servicesData &&
                            servicesData?.data?.result?.map((service) => {
                                return (
                                    <Col sm={6} md={4} lg={3} key={service.id}>
                                        <ServiceCard serviceCard={service} />
                                    </Col>
                                );
                            })}
                    </Row>
                    {topSkillsInNepal.length > 0 && (
                        <div className="freelance-tasks__top-skills">
                            <h1>Top skills in Nepal</h1>
                            <Row>
                                {/* {!topSkillsInNepal && } */}
                                {JSON.parse(topSkillsInNepal[0].skills).map(
                                    (skill: string, index: number) => (
                                        <Col md={3} sm={6} xs={6} key={index}>
                                            {skill}
                                        </Col>
                                    )
                                )}
                            </Row>
                        </div>
                    )}
                    <div className="freelance-tasks__bottom-container">
                        <LongSquareImageCard
                            title="An employee takes home 10% more with homeaale"
                            image="/hireinnepal/footer.png"
                            imageOnRight={true}
                            description="“The only way to do great work is to love what you do. If you
                            haven’t found it yet, keep looking. Don’t settle. Homaale your best companion."
                        />
                    </div>
                </section>
            </Container>
        </Layout>
    );
};
export default FreelanceTasks;
