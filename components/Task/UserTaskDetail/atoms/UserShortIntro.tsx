import {
    faClock,
    faLocation,
    faStar,
    faUser,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "react-bootstrap";
import { TaskDetail } from "staticData/taskDetail";

interface UserShortIntroProps {
    user: TaskDetail["user"];
}
export const UserShortIntro = ({ user }: UserShortIntroProps) => {
    return (
        <Row className="td-user-short-intro">
            <Col>
                <p>
                    <FontAwesomeIcon className="svg-icon" icon={faLocation} />
                    <span>{user.location}</span>
                </p>
                <p>
                    <FontAwesomeIcon className="svg-icon" icon={faClock} />
                    <span>{user.activeHours}</span>
                </p>
                <p>
                    <FontAwesomeIcon className="svg-icon" icon={faUser} />
                    <span>Member Since {user.memberSince}</span>
                </p>
                <p>
                    <FontAwesomeIcon className="svg-icon" icon={faStar} />
                    <span>{user.offeredServices.join(", ")}</span>
                </p>
            </Col>
            <Col>
                <p>{user.bio}</p>
            </Col>
        </Row>
    );
};
