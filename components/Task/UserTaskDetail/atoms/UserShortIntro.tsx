import Spoiler from "@components/Spoiler/Spoiler";
import { createStyles, Text } from "@mantine/core";
import {
    LocationOnOutlined,
    PersonOutline,
    ScienceOutlined,
    TimerOutlined,
} from "@mui/icons-material";
import { format } from "date-fns";
import { Col, Row } from "react-bootstrap";
import type { ITasker } from "types/tasker";
import { convertTo12HourFormat } from "utils/formatTime";

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

    // const activeHourStart = user?.active_hour_start
    //     ? formatTime(user.active_hour_start)
    //     : undefined;
    // const activeHourEnd = user?.active_hour_end
    //     ? formatTime(user.active_hour_end)
    //     : undefined;

    const activeHourStart =
        user?.active_hour_start?.charAt(0) === "0"
            ? user?.active_hour_start?.slice(1)
            : user?.active_hour_start;
    const activeHourEnd =
        user?.active_hour_end?.charAt(0) === "0"
            ? user?.active_hour_end?.slice(1)
            : user?.active_hour_end;

    return (
        <Row className="td-mt-24">
            <Col md={6}>
                <div className="td-user-short-intro-text">
                    <LocationOnOutlined className="svg-icon" />

                    <span>
                        {/* Location{" "} */}
                        <Text className={classes.boldText}>
                            {user?.address_line1 ?? "Location not available"}
                        </Text>
                    </span>
                </div>
                {memberSince && (
                    <div className="td-user-short-intro-text">
                        <PersonOutline className="svg-icon" />
                        <span>
                            {/* Member since{" "} */}
                            <Text className={classes.boldText}>
                                {memberSince}
                            </Text>
                        </span>
                    </div>
                )}
                <div className="td-user-short-intro-text">
                    <TimerOutlined className="svg-icon" />
                    <span>
                        {/* Active Hours &nbsp; */}
                        <Text className={classes.boldText}>
                            {`${convertTo12HourFormat(activeHourStart)} to 
                            ${convertTo12HourFormat(activeHourEnd)}`}
                        </Text>
                    </span>
                </div>

                <div className="td-user-short-intro-text skills">
                    <ScienceOutlined className="svg-icon" />

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
                    Bio:{" "}
                    {user?.bio.length < 300 ? (
                        user.bio
                    ) : (
                        <Spoiler text={user?.bio} />
                    )}
                </div>
            </Col>
        </Row>
    );
};
const useStyles = createStyles(() => ({
    boldText: {
        fontWeight: 400,
        display: "inline-block",
    },
}));
