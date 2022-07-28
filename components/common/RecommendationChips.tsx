import { faXmarkLarge } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RecommendationChips = ({ title }: { title: string }) => {
    return (
        <div className="chips-wrapper">
            <div className="chips-content d-flex justify-content-between">
                <h6>{title}</h6>
                <FontAwesomeIcon
                    icon={faXmarkLarge}
                    className="svg-icon"
                    onClick={() => alert("This will remove chip")}
                />
            </div>
        </div>
    );
};
export default RecommendationChips;
