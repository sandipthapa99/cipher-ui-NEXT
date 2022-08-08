import HiringStage from "@components/Career/HiringStage";
import LeaveYourCV from "@components/Career/LeaveYourCV";
import AnchorButton from "@components/common/AnchorButton";
import Breadcrum from "@components/common/Breadcrum";
import Layout from "@components/Layout";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { Container } from "react-bootstrap";
import { careerCardValues } from "staticData/careerCardValues";

const CareerDeatils = () => {
    const router = useRouter();
    const { id } = router.query;
    const careerCard = careerCardValues.find((item) => item.id === id);
    return (
        <Layout title="Cipher | Careers">
            <section id="careers-details-section" className="careers-section">
                <Breadcrum currentPage="Career" />
                <Container fluid="xl">
                    <div className="careers-detail bg-white">
                        <h1>{careerCard?.Title}</h1>
                        <p>
                            <span>Location:</span>
                            {careerCard?.data.location}
                        </p>
                        <p>
                            <span>Work Type:</span>
                            {careerCard?.data.workType}
                        </p>
                        <h2>What’s the job?</h2>
                        <div className="d-flex justify-content-between align-items-center careers-detail__job">
                            <span>{careerCard?.data.jobDescription}</span>
                            <figure>
                                <Image
                                    src={"/joinTeam.png"}
                                    alt="buiness pic"
                                    layout="fill"
                                />
                            </figure>
                        </div>
                        <h2>What am I going to do?</h2>
                        <ul>
                            {careerCard?.data.work.map((item, key) => (
                                <li key={key}>{item}</li>
                            ))}
                        </ul>
                        <h2>What are the qualifications?</h2>
                        <ul>
                            {careerCard?.data.qualification.map((item, key) => (
                                <li key={key}>{item}</li>
                            ))}
                        </ul>
                        <AnchorButton
                            className={"big-btn"}
                            href={"/career/apply"}
                            varient={""}
                        >
                            Apply
                        </AnchorButton>
                    </div>
                    <HiringStage />
                    <LeaveYourCV />
                </Container>
            </section>
        </Layout>
    );
};

export default CareerDeatils;
