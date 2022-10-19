import {
    faLocationDot,
    faSparkles,
    faTimer,
    faUser,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createStyles, Text } from "@mantine/core";
import { format } from "date-fns";
import { Col, Row } from "react-bootstrap";
import type { ITasker } from "types/tasker";
import { formatTime } from "utils/formatTime";

interface UserShortIntroProps {
    user: ITasker;
}
export const UserShortIntro = ({ user }: UserShortIntroProps) => {
    const { classes } = useStyles();

    const userSkills = user?.skill ? JSON.parse(user?.skill) : [];

    const getMemberSince = () => {
        const dateString = user?.user?.created_at;
        if (!dateString) return undefined;
        return format(new Date(dateString), "yyyy MMMM dd");
    };
    const memberSince = getMemberSince();

    const activeHourStart = user?.active_hour_start
        ? formatTime(user.active_hour_start)
        : undefined;
    const activeHourEnd = user?.active_hour_end
        ? formatTime(user.active_hour_end)
        : undefined;

    return (
        <Row className="td-mt-24">
            <Col md={6}>
                <div className="td-user-short-intro-text">
                    <FontAwesomeIcon
                        icon={faLocationDot}
                        className="svg-icon"
                    />

                    <span>
                        Location{" "}
                        <Text className={classes.boldText}>
                            {user?.address_line1 ?? "Location not available"}
                        </Text>
                    </span>
                </div>
                {memberSince && (
                    <div className="td-user-short-intro-text">
                        <FontAwesomeIcon className="svg-icon" icon={faUser} />
                        <span>
                            Member since{" "}
                            <Text className={classes.boldText}>
                                {memberSince}
                            </Text>
                        </span>
                    </div>
                )}
                <div className="td-user-short-intro-text">
                    <FontAwesomeIcon icon={faTimer} className="svg-icon" />
                    <span>
                        Active Hours &nbsp;
                        <Text className={classes.boldText}>
                            {`${activeHourStart} to ${activeHourEnd}`}
                        </Text>
                    </span>
                </div>

                <div className="td-user-short-intro-text skills">
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
                </div>
            </Col>
            <Col md={6}>
                <div className="td-user-short-intro-text font-bold">
                    Bio
                    <span>{user?.bio}</span>
                </div>
            </Col>
        </Row>
    );
};
const useStyles = createStyles(() => ({
    boldText: {
        fontWeight: 700,
        display: "inline-block",
    },
}));
