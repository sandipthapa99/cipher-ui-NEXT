import { faWarning } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert } from "@mantine/core";
import React, { useState } from "react";
import { TaskDetailTimelineData } from "staticData/taskDetailTimeline";

import { EachTimeline } from "./EachTimeline";

export const TimelineTab = () => {
    const [activeId, setActiveId] = useState<number>(1);
    const [isGivingRevision, setIsGivingRevision] = useState(false);

    const handleRevisionOpen = () => {
        setIsGivingRevision(true);
    };

    return (
        // <div className="timeline-tab-component">
        //     {TaskDetailTimelineData.map((item) => (
        //         <EachTimeline
        //             {...item}
        //             key={item?.id}
        //             buttonName="Request for revision"
        //             activeId={activeId}
        //             setActiveId={setActiveId}
        //             isGivingRevision={isGivingRevision}
        //             handleRevisionOpen={handleRevisionOpen}
        //             setIsGivingRevision={setIsGivingRevision}
        //         />
        //     ))}
        // </div>
        <Alert
            icon={<FontAwesomeIcon icon={faWarning} />}
            title="Feature Coming soon"
        >
            Stay tuned this feature is coming soon!
        </Alert>
    );
};
