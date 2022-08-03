import React, { ReactElement } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const TooltipMessage = ({
    message,
    place,
    children,
}: {
    message: string;
    place: any;
    children: React.ReactElement;
}) => {
    return (
        <OverlayTrigger
            placement={place}
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip>{message}</Tooltip>}
        >
            {children}
        </OverlayTrigger>
    );
};
export default TooltipMessage;
