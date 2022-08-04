import BigButton from "@components/common/Button";
import { Form, Formik } from "formik";
import React from "react";
import { Container } from "react-bootstrap";

interface GalleryFormProps {
    handlePrev: () => void;
    handleNext: () => void;
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
                    <Formik
                        initialValues={initialValues}
                        onSubmit={(values) => {
                            console.log(values);
                        }}
                    >
                        {({ setFieldValue, errors, touched }) => (
                            <>
                                <Form>
                                    <h5>Gallery</h5>
                                    <p>Add relevant images or videos</p>

                                    <div className="d-flex justify-content-end next-button">
                                        <span className="previous-step-button">
                                            <BigButton
                                                btnTitle={"Previous Step"}
                                                backgroundColor={"#fff"}
                                                textColor="black"
                                                handleClick={handlePrev}
                                            />
                                        </span>
                                        <BigButton
                                            btnTitle={"Next"}
                                            backgroundColor={"#211D4F"}
                                            textColor="#fff"
                                            handleClick={handleNext}
                                        />
                                    </div>
                                </Form>
                            </>
                        )}
                    </Formik>
                </div>
            </Container>
        </section>
    );
};
