import { faArrowRight } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import type { CategoryCardProps } from "types/categoryCard";

const CategoryCardNew = ({
    categoryTitle,
    categoryIcon,
}: CategoryCardProps) => {
    return (
        <div className="hero-category__card-block d-inline-block flex-row">
            <div className="wrapper d-flex">
                <div className="image-block">
                    <figure className="thumbnail-icon">
                        <Image
                            src={categoryIcon}
                            alt="category-icon"
                            height={48}
                            width={32}
                        />
                    </figure>
                </div>
                <div className="details d-flex flex-column justify-content-between">
                    <h1>{categoryTitle}</h1>
                    <a href="">
                        {categoryTitle} related services
                        <FontAwesomeIcon icon={faArrowRight} className="icon" />
                    </a>
                </div>
            </div>
            <p></p>
        </div>
    );
};
export default CategoryCardNew;
