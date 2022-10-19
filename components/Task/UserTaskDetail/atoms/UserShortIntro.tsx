import {
    faLocationDot,
    faSparkles,
    faTimer,
    faUser,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "react-bootstrap";
import type { TaskerDetails } from "staticData/taskDetail";

interface UserShortIntroProps {
    user: TaskerDetails;
}
export const UserShortIntro = ({ user }: UserShortIntroProps) => {
    console.log(
        "🚀 ~ file: UserShortIntro.tsx ~ line 15 ~ UserShortIntro ~ user",
        user
    );
    const userSkills = user?.skill ? JSON.parse(user?.skill) : [];

    const finalfrom =
        user?.active_hour_start?.charAt(0) === "0"
            ? user?.active_hour_start?.slice(1)
            : user?.active_hour_start;
    const finalto =
        user?.active_hour_end?.charAt(0) === "0"
            ? user?.active_hour_end?.slice(1)
            : user?.active_hour_end;
    return (
        <Row className="td-mt-24">
            <Col md={6}>
                <p className="td-user-short-intro-text">
                    <FontAwesomeIcon
                        icon={faLocationDot}
                        className="svg-icon"
                    />

                    <span>{user?.address_line2}</span>
                </p>
                <p className="td-user-short-intro-text">
                    <FontAwesomeIcon className="svg-icon" icon={faUser} />
                    <span>Member Since --TOBE-IMP--</span>
                </p>

                <p className="td-user-short-intro-text">
                    <FontAwesomeIcon icon={faTimer} className="svg-icon" />
                    <span>
                        Active Hours &nbsp;
                        {finalfrom?.replace(":00", "")}
                        AM to&nbsp;
                        {finalto?.replace(":00", "")}PM
                    </span>
                </p>

                <p className="td-user-short-intro-text skills">
                    <FontAwesomeIcon icon={faSparkles} className="svg-icon" />

                    {userSkills
                        ? userSkills.map((info: any, index: any) => (
                              <span key={index}>
                                  {info}
                                  {index < userSkills.length - 2
                                      ? ", "
                                      : index < userSkills.length - 1
                                      ? " and "
                                      : ""}
                              </span>
                          ))
                        : "No skills to show. Please add them"}
                </p>
            </Col>
            <Col md={6}>
                <p className="td-user-short-intro-text font-bold">
                    Bio
                    <span>{user?.bio}</span>
                </p>
            </Col>
        </Row>
    );
};
