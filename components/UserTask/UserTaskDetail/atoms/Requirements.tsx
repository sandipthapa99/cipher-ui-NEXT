import { faCheck } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface RequirementsProps {
    requirements: string[];
}

export const Requirements = ({ requirements }: RequirementsProps) => {
    const renderRequirements = () => {
        return requirements.map((requirement, index) => (
            <li className="requirements__item" key={index}>
                <FontAwesomeIcon
                    icon={faCheck}
                    className="svg-icon"
                    color="#3EAEFF"
                />
                <span className="text">{requirement}</span>
            </li>
        ));
    };
    return (
        <div className="requirement-container">
            <h2 className="title mb-24">Requirements</h2>
            <ul className="requirements">{renderRequirements()}</ul>
        </div>
    );
};
