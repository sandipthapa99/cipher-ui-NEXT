import { faCheck } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";

interface ServiceHighlightsProps {
    highlights: string[];
}
const ServiceHighlights = ({ highlights = [] }: ServiceHighlightsProps) => {
    return (
        <>
            {highlights?.map((value: { id: string; name: string }, key) => (
                <p className="mb-4" key={key}>
                    <FontAwesomeIcon
                        icon={faCheck}
                        className="me-3 svg-icon svg-icon-check"
                    />
                    {value.name}
                </p>
            ))}
        </>
    );
};
export default ServiceHighlights;
