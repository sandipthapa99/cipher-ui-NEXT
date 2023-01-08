import { BreadCrumb } from "@components/common/BreadCrumb";
import { SearchInputField } from "@components/common/SearchInputField";
import Layout from "@components/Layout";
import { ChevronRight, FilterList } from "@mui/icons-material";
import type { NextPage } from "next";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import searchValidationSchema from "utils/formValidation/searchValidation";
const Saved: NextPage = () => {
    return (
        <Layout
            title="Saved | Homaale"
            description="Homaale is a platform designed to provide service booking solutions to the
            service seekers and business opportunities to various service providing companies by bridging a gap between them.
             It covers a wide range of services from various industries like Accounting, Gardening,
            Health, Beauty, and many more."
            keywords="homaale, bookmarks, saved, homaale-bookmarks, airtasker-nepali,nepali-working-platform, business, online-business"
        >
            <section className="saved-page">
                <section className="saved-page__header">
                    <Container fluid="xl" className="px-4">
                        <BreadCrumb currentPage="Saved" />
                        <Row className="d-flex align-items-center">
                            <Col md={6}>
                                <h1 className="heading-title">Saved</h1>
                            </Col>
                            <Col md={6}>
                                <Row>
                                    <Col md={10} sm={10}>
                                        <SearchInputField
                                            validationSchema={
                                                searchValidationSchema
                                            }
                                            placeholder="Search here"
                                        />
                                    </Col>
                                    <Col md={2} sm={2}>
                                        <div className="filter-icon">
                                            <FilterList className="svg-icon" />
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <div className="saved-page__saved-services">
                            <div className="title-wrapper d-flex justify-content-between">
                                {/* <h2 className="heading-title">Community activity</h2> */}
                                <h2>
                                    Services <span>(20)</span>
                                </h2>{" "}
                                <Link href="/search">
                                    <a className="view-more">
                                        view more{" "}
                                        <ChevronRight className="svg-icon" />
                                    </a>
                                </Link>
                                <div className="content"></div>
                            </div>
                        </div>
                        <div className="saved-page__saved-taskers">
                            <div className="title-wrapper d-flex justify-content-between">
                                {/* <h2 className="heading-title">Community activity</h2> */}
                                <h2>
                                    Taskers <span>(30)</span>
                                </h2>
                                <a href="#!" className="view-more">
                                    view more{" "}
                                    <ChevronRight className="svg-icon" />
                                </a>
                            </div>
                        </div>
                    </Container>
                </section>
            </section>
        </Layout>
    );
};
export default Saved;
