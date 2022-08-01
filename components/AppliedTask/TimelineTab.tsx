import React, { useState } from "react";
import { TaskDetailTimelineData } from "staticData/taskDetailTimeline";
import { EachTimeline } from "./EachTimeline";

export const TimelineTab = () => {
    const [activeId, setActiveId] = useState<number>(1);

      
    return (
        <div className="timeline-tab-component">
            {TaskDetailTimelineData.map((item) => (
                <EachTimeline {...item} key={item?.id} buttonName="Request for revision" activeId = {activeId} setActiveId={setActiveId} />
            ))}
        </div>
    );
};
