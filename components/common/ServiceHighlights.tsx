import { Check } from "@mui/icons-material";
import { Fragment } from "react";

interface ServiceHighlightsProps {
    highlights: string[];
}
const ServiceHighlights = ({ highlights = [] }: ServiceHighlightsProps) => {
    return (
        <>
            {highlights?.map((value, key) => (
                <p className="mb-4" key={key}>
                    <Check className="me-3 svg-icon svg-icon-check" />
                    {value}
                </p>
            ))}
        </>
    );
};
export default ServiceHighlights;
