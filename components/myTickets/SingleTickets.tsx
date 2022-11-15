import { Badge } from "@mantine/core";
import { formatDistanceToNow } from "date-fns";

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
    return (
        <div className="single-ticket">
            <div className="single-ticket-content">
                <div className="d-flex justify-content-between align-items-center">
                    <p className="head-text">{reason} ab</p>
                    <p className="date-text-ticket">
                        {formatDistanceToNow(new Date(createdAt), {
                            addSuffix: true,
                        })}
                    </p>
                </div>
                <div className="desc-cont">
                    <p className="desc-para">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Suscipit aut repudiandae aperiam, vero laudantium
                        quam harum explicabo magni provident quibusdam corporis
                        ipsam, quae, animi unde exercitationem nulla enim
                        voluptatum voluptatibus corrupti dolor reiciendis.
                        Eveniet ipsum autem corporis voluptatem, accusamus ex
                        quasi laborum vitae dolorem maiores doloribus aliquam
                        obcaecati expedita? Pariatur.
                    </p>
                </div>
                <div className="badge-cont">
                    <Badge size="lg">{status}</Badge>
                    <Badge color="gray" size="lg" variant="outline">
                        {supportId}
                    </Badge>
                </div>
            </div>
        </div>
    );
};

export default SingleTickets;
