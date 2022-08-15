import { faXmarkLarge } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface RecommendationChipsProps {
    title: string;
    onChipRemove?: (chip: string) => void;
}
const RecommendationChips = ({
    title,
    onChipRemove,
}: RecommendationChipsProps) => {
    return (
        <div className="chips-wrapper">
            <div className="chips-content d-flex justify-content-between">
                <h6>{title}</h6>
                <FontAwesomeIcon
                    icon={faXmarkLarge}
                    className="svg-icon"
                    onClick={() => onChipRemove?.(title)}
                />
            </div>
        </div>
    );
};
export default RecommendationChips;
