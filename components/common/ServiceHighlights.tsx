import { faCheck } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ServiceHighlights = ({
    highlight,
}: // isChecked,
{
    highlight: { id: number; name?: string; title?: string };
    // isChecked: boolean
}) => {
    return (
        // <div className="py-2 checkbox d-flex align-items-center">
        //   <input
        //     type="checkbox"
        //     className="input"
        //     id="defaultIndeterminate"
        //     checked={isChecked}
        //     onChange={() => {}}
        //   />
        //   <label className="label" style={{ marginLeft: '1.5rem' }}>
        //     {title}
        //   </label>
        // </div>
        <p className="mb-4">
            <FontAwesomeIcon
                icon={faCheck}
                className="me-3 svg-icon svg-icon-check"
            />
            {highlight.name}
        </p>
    );
};
export default ServiceHighlights;
