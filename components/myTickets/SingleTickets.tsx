import { Badge } from "@mantine/core";
import { formatDistanceToNow } from "date-fns";

interface SupportProps {
    reason: string;
    description: string;
    createdAt: string;
    status: string;
    supportId: string;
    isResolved: boolean;
}

const SingleTickets = ({
    reason,
    description,
    createdAt,
    status,
    supportId,
    isResolved,
    ...rest
}: SupportProps) => {
    const badgeColor = (status: string, resolved: boolean): string => {
        if (status === "open") {
            return "blue";
        } else if (status === "assigned") {
            return "orange";
        } else if (status === "closed") {
            return "red";
        }
        return "blue";
    };

    return (
        <div className="single-ticket">
            <div className="single-ticket-content">
                <div className="reason-cont">
                    <p className="head-text">
                        {reason}

                        {isResolved ? (
                            <Badge size="lg" color="green" className="mx-4">
                                Resolved
                            </Badge>
                        ) : null}
                    </p>
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
                    <Badge size="lg" color={badgeColor(status, isResolved)}>
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
