import { faCheck } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";

const ServiceHighlights = ({
    highlight,
}: // isChecked,
{
    highlight: Record<string, string>;
}) => {
    return (
        <>
            {Object.values(highlight).map((value, key) => (
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
