import React from "react";
import { Col, Row } from "react-bootstrap";

const HiringStage = () => {
    return (
        <div className="hiring-stage mt-5">
            <h1>Cipher Hiring Stages</h1>
            <Row>
                <Col md={6} sm={12}>
                    <ol>
                        <li>Application Submission</li>
                        <li>Application Submission</li>
                        <li>Application Submission</li>
                    </ol>
                </Col>
                <Col md={6} sm={12}>
                    <div className="hiring-stage__application p-5">
                        <h3>Application submission</h3>
                        <p>
                            Our application form is simple to complete,
                            consisting mostly of contact information and a
                            resume/CV upload.
                        </p>
                        <p>
                            Your application to a job post through our Careers
                            site, or through LinkedIn Easy Apply, triggers your
                            entry into the hiring process.
                        </p>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default HiringStage;
