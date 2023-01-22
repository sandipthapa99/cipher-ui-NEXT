import BigButton from "@components/common/Button";
import { useRouter } from "next/router";
import React from "react";
import { Col, Row } from "react-bootstrap";

export const EarnMoneyVideoComponent = () => {
    const router = useRouter();

    const handleButtonClick = () => {
        router.push({ pathname: "/task" });
    };
    return (
        <div className="d-flex earn-money-video-component">
            <Row>
                <Col md={7} sm={12}>
                    <div className="video">
                        <iframe
                            src="https://www.youtube.com/embed/dxhzAqQsqAo"
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
                        <h1>What are the tasks I can pursue?</h1>
                        <p>
                            Once you create your profile as a tasker, your
                            skills and experiences will be saved with us. The
                            tasks will be displayed as per your experience on
                            your profile, or you can also search the tasks and
                            apply as per your preference.
                        </p>
                        <BigButton
                            btnTitle={"Browse Tasks"}
                            backgroundColor={"#fff"}
                            handleClick={handleButtonClick}
                        />
                    </div>
                </Col>
            </Row>
        </div>
    );
};
