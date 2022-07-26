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
                    <span className="td-text">{user.location}</span>
                </p>
                <p>
                    <FontAwesomeIcon className="svg-icon" icon={faClock} />
                    <span className="td-text">{user.activeHours}</span>
                </p>
                <p>
                    <FontAwesomeIcon className="svg-icon" icon={faUser} />
                    <span className="td-text">
                        Member Since {user.memberSince}
                    </span>
                </p>
                <p>
                    <FontAwesomeIcon className="svg-icon" icon={faStar} />
                    <span className="td-text">
                        {user.offeredServices.join(", ")}
                    </span>
                </p>
            </Col>
            <Col>
                <p className="td-text">{user.bio}</p>
            </Col>
        </Row>
    );
};
