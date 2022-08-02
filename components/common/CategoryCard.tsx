import Image from "next/image";
import type { CategoryCardProps } from "types/categoryCard";

const CategoryCard = ({ categoryTitle, categoryIcon }: CategoryCardProps) => {
    return (
        <div className="category-card-block">
            <div className="category-card-block__image-block">
                <figure className="thumbnail-icon">
                    <Image
                        src={categoryIcon}
                        alt="category-icon"
                        height={48}
                        width={48}
                    />
                </figure>
            </div>
            <p>{categoryTitle}</p>
        </div>
    );
};
export default CategoryCard;
