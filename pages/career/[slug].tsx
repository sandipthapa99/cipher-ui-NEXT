import AnchorButton from "@components/common/AnchorButton";
import { BreadCrumb } from "@components/common/BreadCrumb";
import Layout from "@components/Layout";
import urls from "constants/urls";
import parse from "html-react-parser";
import type { GetStaticPaths, GetStaticProps } from "next";
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
        <Layout
            title={`Careers | ${career?.title}`}
            // ogImage={`${career.}`}
            description={career?.description}
            ogUrl={`/career/${career?.slug}`}
        >
            <section id="careers-details-section" className="careers-section">
                <BreadCrumb currentPage={career?.title} />
                <Container fluid="xl">
                    <div className="careers-detail bg-white">
                        <h1>{career?.title}</h1>
                        <p>
                            <span className="p-title">Location:</span>
                            {career?.location}
                        </p>
                        <p>
                            <span className="p-title">Work Type:</span>
                            {career?.job_type}
                        </p>
                        <h2>What&apos;s the job?</h2>
                        <div className="d-flex justify-content-between align-items-center careers-detail__job">
                            {career && <div>{parse(career?.description)}</div>}
                            {/* <figure>
                                <Image
                                    src={"/joinTeam.png"}
                                    alt="buiness pic"
                                    layout="fill"
                                />
                            </figure> */}
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
                    {/* <HiringStage />
                    <LeaveYourCV /> */}
                </Container>
            </section>
        </Layout>
    );
};

export default CareerDeatils;

export const getStaticPaths: GetStaticPaths = async () => {
    try {
        const { data: careerData } = await axiosClient.get(urls.carrer.list);
        const paths = careerData?.result?.map(
            ({ slug }: CareerValueProps["result"][0]) => ({
                params: { slug: slug },
            })
        );
        return { paths, fallback: true };
    } catch (error: any) {
        return {
            paths: [],
            fallback: true,
        };
    }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    try {
        const { data } = await axiosClient.get<CareerDetailsData>(
            `${urls.carrer.detail}${params?.slug}`
        );

        return {
            props: {
                career: data.data,
            },
            revalidate: 10,
        };
    } catch (error: any) {
        return {
            props: {
                career: {},
            },
            revalidate: 10,
        };
    }
};
