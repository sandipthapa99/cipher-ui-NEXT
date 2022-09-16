import { faWarning } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert } from "@mantine/core";
import React, { useState } from "react";

export const Collaboration = () => {
    const [onToogle, setOnToogle] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    };

    const handleOpen = () => {
        setShow(true);
    };

    return (
        // <div className="collaboration-tab">
        //     <div className="d-flex justify-content-between collaboration-header">
        //         <div className="header-right">
        //             <h4>Open for Collaboration</h4>
        //             <p>
        //                 You can collaborate with other freelancer to complete
        //                 the task.
        //             </p>
        //         </div>
        //         <div className="form-check form-switch">
        //             <input
        //                 className="form-check-input"
        //                 type="checkbox"
        //                 role="switch"
        //                 id="flexSwitchCheckChecked"
        //                 onChange={(event) => setOnToogle(event.target.checked)}
        //             />
        //         </div>
        //     </div>

        //     {onToogle && (
        //         <Row className="g-5">
        //             {DUMMY_TASKS.map((item, index) => (
        //                 <Col lg={6} md={12} sm={12} key={index}>
        //                     {/* <UserTaskCard
        //                         task={item}
        //                         onTaskClick={() => {}}
        //                         isButton={true}
        //                         handleButtonClick={handleOpen}
        //                     /> */}

        //                     <TeamMembersCard
        //                         image={item?.user?.profileImage}
        //                         name={item?.user?.username}
        //                         speciality={item?.user?.category}
        //                         rating={item?.rating?.average}
        //                         happyClients={item?.likes}
        //                         awardPercentage={item?.rewardPercentage}
        //                         location={item?.user?.location}
        //                         distance={"2 km"}
        //                         bio={item?.user?.bio}
        //                         charge={item?.price}
        //                         collabButton={true}
        //                         handleButtonClick={handleOpen}
        //                         tasker={""}
        //                     />
        //                 </Col>
        //             ))}
        //         </Row>
        //     )}

        //     <CollaborationRequestForm show={show} handleClose={handleClose} />
        // </div>
        <Alert
            icon={<FontAwesomeIcon icon={faWarning} />}
            title="Feature Coming soon"
        >
            Stay tuned this feature is coming soon!
        </Alert>
    );
};
