import { SearchBody } from "@components/SearchTask/searchBody";
import { useGetProfile } from "hooks/profile/useGetProfile";
import { Col, Row } from "react-bootstrap";
import { SearchBodyData } from "staticData/searchBody";

const WelcomeUser = () => {
    const { data: profileDetails } = useGetProfile();
    return (
        <>
            <Row className="user-stats">
                <Col lg={7} md={6} className="user-details">
                    <div className="user-name">
                        <h2>
                            Hi{" "}
                            <span>
                                {profileDetails
                                    ? profileDetails?.full_name
                                    : "user"}
                            </span>
                            ,
                        </h2>
                        <h1>Welcome Back!</h1>
                    </div>
                </Col>
                <Col lg={5} md={6} xs={12}>
                    <Row>
                        {SearchBodyData.map((data) => (
                            <Col
                                className="user-stat-card"
                                key={data.id}
                                lg={3}
                                md={6}
                                sm={6}
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
