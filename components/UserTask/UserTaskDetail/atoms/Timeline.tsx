import React from "react";
import { Form } from "react-bootstrap";

export const Timeline = () => {
    return (
        <div className="tasker-timeline">
            <h2 className="title mb-24">Timeline</h2>
            <div className="tasker-timeline__content">
                <Form.Check defaultChecked type="radio" />
                <div>
                    <h4>
                        Harry Smith has booked service: Root Canal Treatment
                        (RCT){" "}
                    </h4>
                    <span className="text">Today</span>
                </div>
            </div>
        </div>
    );
};
