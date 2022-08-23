import BigButton from "@components/common/Button";
import React from "react";
import { Col, Row } from "react-bootstrap";

export const EarnMoneyVideoComponent = () => {
    return (
        <div className="d-flex earn-money-video-component">
            <Row>
                <Col md={7} sm={12}>
                    <div className="video">
                        <iframe
                            src="https://www.youtube.com/embed/E7wJTI-1dvQ"
                            frameBorder="0"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            title="video"
                            height="100%"
                            width="100%"
                        />
                    </div>
                </Col>
                <Col md={5} sm={12}>
                    <div className="description">
                        <h1>what are the tasks I can pursue?</h1>
                        <p>
                            Whatever the job, you can find it on Cipher.
                            Complete your profile so that we can find right
                            tasks for you.
                        </p>
                        <BigButton
                            btnTitle={"Browse Tasks"}
                            backgroundColor={"#fff"}
                        />
                    </div>
                </Col>
            </Row>
        </div>
    );
};
