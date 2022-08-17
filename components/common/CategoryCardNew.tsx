import { faArrowRight } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import type { CategoryCardProps } from "types/categoryCard";

const CategoryCardNew = ({
    categoryTitle,
    categoryIcon,
}: CategoryCardProps) => {
    return (
        <div className="hero-category__card-block d-inline-block flex-row">
            <div className="wrapper d-flex flex-row">
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
                <div className="details d-flex flex-column">
                    <h1>{categoryTitle}</h1>
                    <div className="d-flex justify-content-between">
                        <Link href={`category/${categoryTitle}`}>
                            <a className="d-flex">
                                <span>{categoryTitle} related services</span>
                                <FontAwesomeIcon
                                    icon={faArrowRight}
                                    className="icon"
                                />
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CategoryCardNew;
