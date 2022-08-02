import RecommendationChips from "@components/common/RecommendationChips";
import SelectInputField from "@components/common/SelectInputField";
import Layout from "@components/Layout";
import { faChevronDown, faSearch } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik } from "formik";
import { NextPage } from "next";
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
                        <Col md="6" className="right"></Col>
                    </Row>
                </Container>
            </section>
        </Layout>
    );
};
export default LandingPage;
