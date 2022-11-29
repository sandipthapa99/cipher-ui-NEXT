import React, { useState } from "react";
import { TaskDetailTimelineData } from "staticData/taskDetailTimeline";
import type { TaskTimeLineProps } from "types/taskTimeLine";

import { EachTimeline } from "./EachTimeline";

export const TimelineTab = ({ TimeLine }: { TimeLine: TaskTimeLineProps }) => {
    const [activeId, setActiveId] = useState<number>(1);
    const [isGivingRevision, setIsGivingRevision] = useState(false);

    const handleRevisionOpen = () => {
        setIsGivingRevision(true);
    };

    return (
        <div className="timeline-tab-component">
            {TimeLine.map((item, key) => (
                <EachTimeline
                    id={key}
                    task_status={item?.change_message}
                    date={item?.action_time}
                    {...item}
                    key={key}
                    buttonName="Request for revision"
                    activeId={activeId}
                    setActiveId={setActiveId}
                    isGivingRevision={isGivingRevision}
                    handleRevisionOpen={handleRevisionOpen}
                    setIsGivingRevision={setIsGivingRevision}
                />
            ))}
        </div>
        // <Alert
        //     icon={<FontAwesomeIcon icon={faWarning} />}
        //     title="Feature Coming soon"
        // >
        //     Stay tuned this feature is coming soon!
        // </Alert>
    );
};
