import { Badge } from "@mantine/core";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";

interface SupportProps {
    reason: string;
    description: string;
    createdAt: string;
    status: string;
    supportId: string;
}

const SingleTickets = ({
    reason,
    description,
    createdAt,
    status,
    supportId,
}: SupportProps) => {
    const badgeColor = (status: string): string => {
        if (status === "open") {
            return "blue";
        } else if (status === "assigned") {
            return "orange";
        } else if (status === "cancelled") {
            return "red";
        } else if (status === "resolved") {
            return "green";
        }
        return "";
    };

    return (
        <div className="single-ticket">
            <div className="single-ticket-content">
                <div className="reason-cont">
                    <p className="head-text">{reason}</p>
                    <p className="date-text-ticket">
                        {formatDistanceToNow(new Date(createdAt), {
                            addSuffix: true,
                        })}
                    </p>
                </div>
                <div className="desc-cont">
                    <p className="desc-para">{description}</p>
                </div>
                <div className="badge-cont">
                    <Badge size="lg" color={badgeColor(status)}>
                        {status}
                    </Badge>
                    <Badge color="gray" size="lg" variant="outline">
                        {supportId}
                    </Badge>
                </div>
            </div>
        </div>
    );
};

export default SingleTickets;
