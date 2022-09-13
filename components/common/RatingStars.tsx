import { faStar } from "@fortawesome/pro-regular-svg-icons";
import { faStar as rated } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface RatingStarsProps {
    value: number;
}

export const RatingStars = ({ value }: RatingStarsProps) => {
    // const renderRatingStars = () => {
    //     return Array.from({ length: 5 })
    //         .map((_, index) => index)
    //         .map((index) => (
    //             <FontAwesomeIcon
    //                 className="rating-star"
    //                 size="10x"
    //                 color="#FAB005"
    //                 key={index}
    //                 icon={index > value ? faStarRegular : faStarSolid}
    //             />
    //         ));
    // };
    // return <div className="d-flex">{renderRatingStars()}</div>;

    return (
        <div className="rating">
            {Array.from({ length: Math.ceil(value) }, (_, i) => (
                <span key={i}>
                    <FontAwesomeIcon
                        icon={rated}
                        className="rating-star rated-star"
                    />
                </span>
            ))}
            {Array.from(
                {
                    length: 5 - Math.ceil(value),
                },
                (_, i) => (
                    <span key={i}>
                        {" "}
                        <FontAwesomeIcon
                            icon={faStar}
                            className="rating-star unrated"
                        />
                    </span>
                )
            )}
        </div>
    );
};
