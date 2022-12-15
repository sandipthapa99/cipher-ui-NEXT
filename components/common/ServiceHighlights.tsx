import { faCheck } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";

interface ServiceHighlightsProps {
    highlights: string[];
}
const ServiceHighlights = ({ highlights = [] }: ServiceHighlightsProps) => {
    console.log(
        "🚀 ~ file: ServiceHighlights.tsx ~ line 9 ~ ServiceHighlights ~ highlights",
        highlights
    );
    return (
        <>
            {highlights?.map((value, key) => (
                <p className="mb-4" key={key}>
                    <FontAwesomeIcon
                        icon={faCheck}
                        className="me-3 svg-icon svg-icon-check"
                    />
                    {value}
                </p>
            ))}
        </>
    );
};
export default ServiceHighlights;
