import { faAngleRight } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

export const StepsLine = ({ step }: { step: number }) => {
    const [oneActive, setOneActive] = useState(false);
    const [twoActive, setTwoActive] = useState(false);
    const [threeActive, setThreeActive] = useState(false);
    const [fourActive, setFourActive] = useState(false);

    console.log("oneactive", oneActive);
    console.log("twoactive", twoActive);
    console.log("threeactive", threeActive);
    console.log("fouractive", fourActive);

    useEffect(() => {
        if (step === 1) {
            setOneActive(true);
            setTwoActive(false);
            setThreeActive(false);
            setFourActive(false);
        } else if (step === 2) {
            setOneActive(true);
            setTwoActive(true);
            setThreeActive(false);
            setFourActive(false);
        } else if (step === 3) {
            setOneActive(true);
            setTwoActive(true);
            setThreeActive(true);
            setFourActive(false);
        } else {
            setOneActive(true);
            setTwoActive(true);
            setThreeActive(true);
            setFourActive(true);
        }
    }, [step]);

    return (
        <section id="steps-line-add-service" className="steps-line-add-service">
            <Container>
                <div className="d-flex align-items-center mt-5 steps-line">
                    <span
                        className={oneActive ? "step-one__active" : "step-one"}
                    >
                        1
                    </span>
                    <span
                        className={
                            oneActive
                                ? "step-name-one__active"
                                : "step-name-one"
                        }
                    >
                        Details
                    </span>
                    <FontAwesomeIcon icon={faAngleRight} />
                    <span
                        className={twoActive ? "step-two__active" : "step-two"}
                    >
                        2
                    </span>
                    <span
                        className={
                            twoActive
                                ? "step-name-two__active"
                                : "step-name-two"
                        }
                    >
                        Pricing
                    </span>
                    <FontAwesomeIcon icon={faAngleRight} />
                    <span
                        className={
                            threeActive ? "step-three__active" : "step-three"
                        }
                    >
                        3
                    </span>
                    <span
                        className={
                            threeActive
                                ? "step-name-three__active"
                                : "step-name-three"
                        }
                    >
                        Gallery
                    </span>
                    <FontAwesomeIcon icon={faAngleRight} />
                    <span
                        className={
                            fourActive ? "step-four__active" : "step-four"
                        }
                    >
                        4
                    </span>
                    <span
                        className={
                            fourActive
                                ? "step-name-four__active"
                                : "step-name-four"
                        }
                    >
                        Publish
                    </span>
                </div>
            </Container>
        </section>
    );
};
