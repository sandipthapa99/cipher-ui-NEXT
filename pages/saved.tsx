import { BreadCrumb } from "@components/common/BreadCrumb";
import { SearchInputField } from "@components/common/SearchInputField";
import Layout from "@components/Layout";
import { faFilterList } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { NextPage } from "next";
import Image from "next/image";
import { Carousel, Col, Container, Row } from "react-bootstrap";
import searchValidationSchema from "utils/formValidation/searchValidation";

const Saved: NextPage = () => {
    return (
        <Layout title="Saved | Cipher">
            <section className="saved-page">
                <section className="saved-page__header">
                    <Container fluid="xl" className="px-5">
                        <BreadCrumb currentPage="Saved" />
                        <Row className="d-flex align-items-center">
                            <Col md={6}>
                                <h1 className="heading-title">Saved</h1>
                            </Col>
                            <Col md={6}>
                                <Row>
                                    <Col md={10}>
                                        <SearchInputField
                                            validationSchema={
                                                searchValidationSchema
                                            }
                                            placeholder="Search here"
                                        />
                                    </Col>
                                    <Col md={2}>
                                        <div className="filter-icon">
                                            <FontAwesomeIcon
                                                icon={faFilterList}
                                                className="svg-icon"
                                            />
                                        </div>
                                    </Col>
                                </Row>

                                {/* <div className="select-type">
                                   
                                </div> */}
                            </Col>
                        </Row>

                        <div className="saved-page__saved-services">
                            <h2>
                                Services <span>(20)</span>
                            </h2>
                        </div>
                        <div className="saved-page__saved-taskers">
                            <h2>
                                Taskers <span>(30)</span>
                            </h2>
                        </div>
                    </Container>
                </section>
            </section>
        </Layout>
    );
};

export default Saved;
