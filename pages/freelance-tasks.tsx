import { BreadCrumb } from "@components/common/BreadCrumb";
import LongSquareImageCard from "@components/common/LongSquareImageCard";
import { SearchInputField } from "@components/common/SearchInputField";
import ServiceCard from "@components/common/ServiceCard";
import SquareImageCarousel from "@components/common/SquareImageCarousel";
import Layout from "@components/Layout";
import { useData } from "hooks/use-data";
import type { NextPage } from "next";
import { Carousel, Col, Container, Row } from "react-bootstrap";
import { freelanceTasksCarousel } from "staticData/freelanceTasks";
import { topSkillsInNepal } from "staticData/hireInNepal";
import type { ServicesValueProps } from "types/serviceCard";
import searchValidationSchema from "utils/formValidation/searchValidation";
const FreelanceTasks: NextPage = () => {
    const { data: servicesData } = useData<ServicesValueProps>(
        ["all-services"],
        "/task/service/"
    );
    return (
        <Layout title="Freelance Tasks | Cipher">
            <Container fluid="xl">
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

                    <div className="freelance-tasks__top-skills">
                        <h1>Top skills in Nepal</h1>
                        <Row>
                            {topSkillsInNepal &&
                                topSkillsInNepal.map((skill) => (
                                    <Col md={3} sm={6} xs={6} key={skill.id}>
                                        <p>{skill.name}</p>
                                    </Col>
                                ))}
                        </Row>
                    </div>
                    <div className="freelance-tasks__bottom-container">
                        <LongSquareImageCard
                            title="An employee takes home 10% more with Cipher Payroll"
                            image="/hireinnepal/footer.png"
                            imageOnRight={true}
                            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500."
                        />
                    </div>
                </section>
            </Container>
        </Layout>
    );
};
export default FreelanceTasks;
