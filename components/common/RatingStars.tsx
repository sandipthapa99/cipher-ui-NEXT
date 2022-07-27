import { faStar as faStarRegular } from "@fortawesome/pro-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface RatingStarsProps {
    value: number;
}
export const RatingStars = ({ value }: RatingStarsProps) => {
    const renderRatingStars = () => {
        return Array.from({ length: 5 })
            .map((_, index) => index)
            .map((index) => (
                <FontAwesomeIcon
                    className="rating-star"
                    size="10x"
                    color="#FF9700"
                    key={index}
                    icon={index > value ? faStarRegular : faStarSolid}
                />
            ));
    };
    return <div className="d-flex">{renderRatingStars()}</div>;
};
