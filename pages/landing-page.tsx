import RecommendationChips from "@components/common/RecommendationChips";
import SelectInputField from "@components/common/SelectInputField";
import Layout from "@components/Layout";
import {
    faArrowRight,
    faChevronDown,
    faSearch,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik } from "formik";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button, Col, Container, Row } from "react-bootstrap";
import HomeSearchSchema from "utils/formValidation/homeSearchValidation";
import { HomeSearchdata } from "utils/homeSearchData";
import { myOptions } from "utils/options";

const LandingPage: NextPage = () => {
    return (
        <Layout title="Cipher - Catering to Your Requirements">
            <section className="landing-main-banner">
                <Container fluid="xl" className="px-5">
                    <Row className="gx-5">
                        <Col md="6" className="left">
                            <div className="content">
                                {/* Hero Text Start Here */}
                                <h1>Catering To Your Requirements</h1>
                                {/* Hero Text End Here */}
                            </div>
                            <div className="search-bar">
                                <Formik
                                    initialValues={HomeSearchdata}
                                    validationSchema={HomeSearchSchema}
                                    onSubmit={async (values) => {
                                        console.log(values);
                                    }}
                                >
                                    <div className="search_box">
                                        <div className="dropdown d-flex align-items-center">
                                            <SelectInputField
                                                name="experience"
                                                placeHolder="All"
                                                options={myOptions}
                                                fieldRequired
                                            />
                                            <FontAwesomeIcon
                                                icon={faChevronDown}
                                                className="svg-icon"
                                            />
                                        </div>
                                        <div className="search_field">
                                            <input
                                                type="text"
                                                className="input"
                                                placeholder="Find your services"
                                            />
                                        </div>
                                        <Link href="/search">
                                            <a className="">
                                                <Button className="search-btn">
                                                    <FontAwesomeIcon
                                                        icon={faSearch}
                                                        className="icon"
                                                    />
                                                </Button>
                                            </a>
                                        </Link>
                                    </div>
                                </Formik>
                            </div>
                            <div className="chips-section d-md-flex d-none">
                                <RecommendationChips title="Garden Cleaner" />
                                <RecommendationChips title="Plumber" />
                                <RecommendationChips title="Electrician" />
                                <RecommendationChips title="Washing Machine" />
                            </div>

                            <div className="come-with-us">
                                <h1>Come with Us For</h1>
                                <div className="">
                                    <Link href="">
                                        <a href="" className="hero-cta">
                                            Earn Money as a Professional
                                        </a>
                                    </Link>
                                    <Link href="">
                                        <a href="" className="hero-cta">
                                            Post a Task
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </Col>
                        <Col md="6" className="right">
                            <figure className="new-img">
                                <Image
                                    src="/hero-img.svg"
                                    alt="hero-img"
                                    height={600}
                                    width={600}
                                    // objectFit="contain"
                                />
                            </figure>
                        </Col>
                    </Row>
                    <Row className="gx-5">
                        <Col md={3}>
                            <div className="hero-category__card-block d-inline-block flex-row">
                                <div className="wrapper d-flex">
                                    <div className="image-block">
                                        <figure className="thumbnail-icon">
                                            <Image
                                                src="/heroImages/beauty.svg"
                                                alt="category-icon"
                                                height={48}
                                                width={32}
                                            />
                                        </figure>
                                    </div>
                                    <div className="details d-flex flex-column justify-content-between">
                                        <h1>Beauty</h1>
                                        <a href="">
                                            Beauty related services
                                            <FontAwesomeIcon
                                                icon={faArrowRight}
                                                className="icon"
                                            />
                                        </a>
                                    </div>
                                </div>
                                <p></p>
                            </div>
                        </Col>
                        <Col md={3}>
                            <div className="hero-category__card-block d-inline-block flex-row">
                                <div className="wrapper d-flex">
                                    <div className="image-block">
                                        <figure className="thumbnail-icon">
                                            <Image
                                                src="/heroImages/beauty.svg"
                                                alt="category-icon"
                                                height={48}
                                                width={32}
                                            />
                                        </figure>
                                    </div>
                                    <div className="details d-flex flex-column justify-content-between">
                                        <h1>Beauty</h1>
                                        <a href="">
                                            Beauty related services
                                            <FontAwesomeIcon
                                                icon={faArrowRight}
                                                className="icon"
                                            />
                                        </a>
                                    </div>
                                </div>
                                <p></p>
                            </div>
                        </Col>
                        <Col md={3}>
                            <div className="hero-category__card-block d-inline-block flex-row">
                                <div className="wrapper d-flex">
                                    <div className="image-block">
                                        <figure className="thumbnail-icon">
                                            <Image
                                                src="/heroImages/beauty.svg"
                                                alt="category-icon"
                                                height={48}
                                                width={32}
                                            />
                                        </figure>
                                    </div>
                                    <div className="details d-flex flex-column justify-content-between">
                                        <h1>Beauty</h1>
                                        <a href="">
                                            Beauty related services
                                            <FontAwesomeIcon
                                                icon={faArrowRight}
                                                className="icon"
                                            />
                                        </a>
                                    </div>
                                </div>
                                <p></p>
                            </div>
                        </Col>
                        <Col md={3}>
                            <div className="hero-category__card-block d-inline-block flex-row">
                                <div className="wrapper d-flex">
                                    <div className="image-block">
                                        <figure className="thumbnail-icon">
                                            <Image
                                                src="/heroImages/beauty.svg"
                                                alt="category-icon"
                                                height={48}
                                                width={32}
                                            />
                                        </figure>
                                    </div>
                                    <div className="details d-flex flex-column justify-content-between">
                                        <h1>Beauty</h1>
                                        <a href="">
                                            Beauty related services
                                            <FontAwesomeIcon
                                                icon={faArrowRight}
                                                className="icon"
                                            />
                                        </a>
                                    </div>
                                </div>
                                <p></p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Layout>
    );
};
export default LandingPage;
