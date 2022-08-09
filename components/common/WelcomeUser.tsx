import { SearchBody } from "@components/SearchTask/searchBody";
import { Col, Row } from "react-bootstrap";
import { SearchBodyData } from "staticData/searchBody";

const WelcomeUser = () => {
    return (
        <>
            <Row className="user-stats">
                <Col md={7} className="user-details">
                    <div className="user-name">
                        <h1>Hi Harry!</h1>
                        <h1>Welcome Back!</h1>
                    </div>
                </Col>
                <Col md={5}>
                    <Row>
                        {SearchBodyData.map((data) => (
                            <Col
                                className="user-stat-card"
                                key={data.id}
                                md={3}
                                xs={6}
                            >
                                <SearchBody
                                    number={data.number}
                                    color={data.color}
                                    textOne={data.textOne}
                                    textColor={data.textColor}
                                />
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </>
    );
};
export default WelcomeUser;
