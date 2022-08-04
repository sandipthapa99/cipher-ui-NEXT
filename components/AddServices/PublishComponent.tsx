import Image from "next/image";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";

interface PublishComponentProps {
    handlePrev: () => void;
}

export const PublishComponent = ({ handlePrev }: PublishComponentProps) => {
    return (
        <section
            id="publish-component-section"
            className="publish-component-section"
        >
            <Container>
                <div className="publish-component">
                    <h1>Garden Cleaner</h1>
                    <p>By Harry Smith, Gardener</p>

                    <Row>
                        <Col md={12} lg={7}>
                            <figure className="thumbnail-img">
                                <Image
                                    src="/service-details/Garden.svg"
                                    layout="fill"
                                    objectFit="cover"
                                    alt="garden-image"
                                />
                            </figure>
                        </Col>
                        <Col md={12} lg={5} className="d-flex"></Col>
                    </Row>
                </div>
            </Container>
        </section>
    );
};
