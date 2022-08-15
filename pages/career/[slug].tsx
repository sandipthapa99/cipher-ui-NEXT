import HiringStage from "@components/Career/HiringStage";
import LeaveYourCV from "@components/Career/LeaveYourCV";
import AnchorButton from "@components/common/AnchorButton";
import { BreadCrumb } from "@components/common/BreadCrumb";
import Layout from "@components/Layout";
import type { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import React from "react";
import { Container } from "react-bootstrap";
import type {
    CareerDetailsData,
    CareerValueProps,
} from "types/careerValuesProps";
import { axiosClient } from "utils/axiosClient";

const CareerDeatils = ({
    career,
}: {
    career: CareerValueProps["result"][0];
}) => {
    return (
        <Layout title="Cipher | Careers">
            <section id="careers-details-section" className="careers-section">
                <BreadCrumb currentPage={career?.title} />
                <Container fluid="xl">
                    <div className="careers-detail bg-white">
                        <h1>{career?.title}</h1>
                        <p>
                            <span>Location:</span>
                            {career?.location}
                        </p>
                        <p>
                            <span>Work Type:</span>
                            {career?.job_type}
                        </p>
                        <h2>What’s the job?</h2>
                        <div className="d-flex justify-content-between align-items-center careers-detail__job">
                            <span>{career?.description}</span>
                            <figure>
                                <Image
                                    src={"/joinTeam.png"}
                                    alt="buiness pic"
                                    layout="fill"
                                />
                            </figure>
                        </div>
                        <h2>What am I going to do?</h2>
                        <ul>{career?.title}</ul>
                        <h2>What are the qualifications?</h2>
                        <ul>{career?.title}</ul>
                        <AnchorButton
                            className={"big-btn"}
                            href={`/career/apply?id=${career?.id}`}
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

export const getStaticPaths: GetStaticPaths = async () => {
    try {
        const { data: careerData } = await axiosClient.get(
            "/career/vacancy/list/"
        );
        const paths = careerData?.result?.map(
            ({ slug }: CareerValueProps["result"][0]) => ({
                params: { slug: slug },
            })
        );
        return { paths, fallback: true };
    } catch (error: any) {
        error.response.data;
        return {
            paths: [],
            fallback: true,
        };
    }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    try {
        const { data } = await axiosClient.get<CareerDetailsData>(
            `/career/vacancy/detail/${params?.slug}`
        );

        return {
            props: {
                career: data.data,
            },
            revalidate: 10,
        };
    } catch (error: any) {
        error.response.data;
        return {
            props: {
                career: {},
            },
            revalidate: 10,
        };
    }
};