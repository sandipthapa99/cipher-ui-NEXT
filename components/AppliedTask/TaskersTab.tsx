import { TeamMembersCard } from "@components/common/TeamMembersCard";
import { faWarning } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert } from "@mantine/core";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { DUMMY_TASKS } from "types/tasks";

export const TaskersTab = () => {
    return (
        // <div className="tasker-tab-taskdetail">
        //     <Row className="g-5">
        //         {DUMMY_TASKS.map((item, index) => (
        //             <Col md={12} lg={6} key={index}>
        //                 <TeamMembersCard
        //                     collabButton={false}
        //                     image={item?.user?.profileImage}
        //                     name={item?.user?.username}
        //                     speciality={item?.user?.category}
        //                     rating={item?.rating?.average}
        //                     happyClients={item?.likes}
        //                     awardPercentage={item?.rewardPercentage}
        //                     location={item?.user?.location}
        //                     distance={"2 km"}
        //                     bio={item?.user?.bio}
        //                     charge={item?.price}
        //                     tasker={""}
        //                 />
        //             </Col>
        //         ))}
        //     </Row>
        // </div>
        <Alert
            icon={<FontAwesomeIcon icon={faWarning} />}
            title="Feature Coming soon"
        >
            Stay tuned this feature is coming soon!
        </Alert>
    );
};
