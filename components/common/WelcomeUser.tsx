import { SearchBody } from "@components/SearchTask/searchBody";
import { useGetProfile } from "hooks/profile/useGetProfile";
import { Col, Row } from "react-bootstrap";

const WelcomeUser = () => {
    const { data: profileDetails } = useGetProfile();

    console.log("abc", profileDetails);

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
                    <Row className="d-flex status">
                        <Col md={3} xs={6}>
                            <div className="type success-rate">
                                <h1 className="number">
                                    {profileDetails
                                        ? profileDetails?.stats?.task_assigned
                                        : 0}
                                </h1>
                                <p>
                                    Task
                                    <br />
                                    Assigned
                                </p>
                            </div>
                        </Col>
                        <Col md={3} xs={6}>
                            <div className="type happy-clients">
                                <h1 className="number">
                                    {profileDetails
                                        ? profileDetails?.stats?.task_completed
                                        : 0}
                                </h1>
                                <p>
                                    Tasks
                                    <br />
                                    Completed
                                </p>
                            </div>
                        </Col>

                        <Col md={3} xs={6}>
                            <div className="type task-completed">
                                <h1 className="number">
                                    {profileDetails
                                        ? profileDetails?.stats
                                              ?.task_in_progress
                                        : 0}
                                </h1>
                                <p>
                                    Tasks
                                    <br />
                                    In Progress
                                </p>
                            </div>
                        </Col>
                        <Col md={3} xs={6}>
                            {" "}
                            <div className="type user-reviews">
                                <h1 className="number">
                                    {profileDetails
                                        ? profileDetails?.stats?.task_cancelled
                                        : 0}
                                </h1>
                                <p>
                                    Tasks
                                    <br />
                                    Cancelled
                                </p>
                            </div>
                        </Col>
                    </Row>
                    {/* <Row>
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
                    </Row> */}
                </Col>
            </Row>
        </>
    );
};
export default WelcomeUser;
