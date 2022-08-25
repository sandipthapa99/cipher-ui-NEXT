import {
    faClock,
    faLocation,
    faStar,
    faUser,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "react-bootstrap";
import type { TaskerDetails } from "staticData/taskDetail";
import { safeParse } from "utils/safeParse";

interface UserShortIntroProps {
    user: TaskerDetails;
}
export const UserShortIntro = ({ user }: UserShortIntroProps) => {
    const userSkills = safeParse<string[]>({
        rawString: user?.skill,
        initialData: [],
    }).join(", ");
    return (
        <Row className="td-mt-24">
            <Col md={6}>
                <p className="td-user-short-intro-text">
                    <FontAwesomeIcon className="svg-icon" icon={faLocation} />
                    <span>
                        {user?.address_line1 + " " + user?.address_line2}
                    </span>
                </p>
                <p className="td-user-short-intro-text">
                    <FontAwesomeIcon className="svg-icon" icon={faClock} />
                    <span>
                        Active hours {user?.active_hour_start} to{" "}
                        {user?.active_hour_end}
                    </span>
                </p>
                <p className="td-user-short-intro-text">
                    <FontAwesomeIcon className="svg-icon" icon={faUser} />
                    <span>Member Since {"member since"}</span>
                </p>
                <p className="td-user-short-intro-text">
                    <FontAwesomeIcon className="svg-icon" icon={faStar} />
                    <span>{userSkills}</span>
                </p>
            </Col>
            <Col md={6}>
                <p className="td-user-short-intro-text">{user?.bio}</p>
            </Col>
        </Row>
    );
};
