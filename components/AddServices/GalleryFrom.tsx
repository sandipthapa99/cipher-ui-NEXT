import BigButton from "@components/common/Button";
import DragDrop from "@components/common/DragDrop";
import { Form, Formik } from "formik";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ServiceVideo } from "./ServiceVideo";

interface GalleryFormProps {
    handlePrev: () => void;
    handleNext: (data: unknown) => void;
}

const initialValues = {
    id: "",
    name: "",
};

export const GalleryFrom = ({ handlePrev, handleNext }: GalleryFormProps) => {
    return (
        <section id="gallery-form-section" className="gallery-form-section">
            <Container>
                <div className="gallery-form">
                    <Row>
                        <Col md={7} sm={12}>
                            <div className="gallery-form-wrapper">
                                <Formik
                                    initialValues={initialValues}
                                    onSubmit={(values) => {
                                        console.log(values);
                                    }}
                                >
                                    {({
                                        setFieldValue,
                                        errors,
                                        touched,
                                        values,
                                    }) => (
                                        <>
                                            <Form>
                                                <h5>Gallery</h5>
                                                <p>
                                                    Add relevant images or
                                                    videos
                                                </p>

                                                <DragDrop
                                                    image={
                                                        "/heroImages/image-upload.png"
                                                    }
                                                    fileType={"Image/Video"}
                                                    maxImageSize={20}
                                                    maxVideoSize={200}
                                                />

                                                <h5>Gallery</h5>
                                                <p>
                                                    Add relevant images or
                                                    videos
                                                </p>

                                                <DragDrop
                                                    image={
                                                        "/heroImages/pdf-upload.png"
                                                    }
                                                    fileType={"Pdf"}
                                                    maxPdfSize={20}
                                                />

                                                <div className="d-flex justify-content-end next-button">
                                                    <span className="previous-step-button">
                                                        <BigButton
                                                            btnTitle={
                                                                "Previous Step"
                                                            }
                                                            backgroundColor={
                                                                "#fff"
                                                            }
                                                            textColor="black"
                                                            handleClick={
                                                                handlePrev
                                                            }
                                                        />
                                                    </span>
                                                    <BigButton
                                                        btnTitle={"Next"}
                                                        backgroundColor={
                                                            "#211D4F"
                                                        }
                                                        textColor="#fff"
                                                        handleClick={() =>
                                                            handleNext(values)
                                                        }
                                                    />
                                                </div>
                                            </Form>
                                        </>
                                    )}
                                </Formik>
                            </div>
                        </Col>
                        <Col md={5} sm={12}>
                            <ServiceVideo
                                title="How to ?"
                                upperDescription="Watch this video to get help for your services"
                                videoId="bNvFLRPuhJs"
                                lowerDescription="Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.  Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum."
                            />
                        </Col>
                    </Row>
                </div>
            </Container>
        </section>
    );
};
