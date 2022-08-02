import {
    faClock,
    faLocation,
    faStar,
    faUser,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "react-bootstrap";
import type { TaskDetail } from "staticData/taskDetail";

interface UserShortIntroProps {
    user: TaskDetail["user"];
}
export const UserShortIntro = ({ user }: UserShortIntroProps) => {
    return (
        <Row className="td-mt-24">
            <Col md={6}>
                <p className="td-user-short-intro-text">
                    <FontAwesomeIcon className="svg-icon" icon={faLocation} />
                    <span>{user.location}</span>
                </p>
                <p className="td-user-short-intro-text">
                    <FontAwesomeIcon className="svg-icon" icon={faClock} />
                    <span>{user.activeHours}</span>
                </p>
                <p className="td-user-short-intro-text">
                    <FontAwesomeIcon className="svg-icon" icon={faUser} />
                    <span>Member Since {user.memberSince}</span>
                </p>
                <p className="td-user-short-intro-text">
                    <FontAwesomeIcon className="svg-icon" icon={faStar} />
                    <span>{user.offeredServices.join(", ")}</span>
                </p>
            </Col>
            <Col md={6}>
                <p className="td-user-short-intro-text">{user.bio}</p>
            </Col>
        </Row>
    );
};
