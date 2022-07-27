import Image from "next/image";
import { AllCategoryCardProps } from "types/categoryCard";

const AllCategoryCard = ({
    categoryTitle,
    categoryImage,
}: AllCategoryCardProps) => {
    return (
        <div className="allcategory-card-block">
            <div className="gradient"></div>
            <figure className="thumbnail-img">
                <Image
                    src={categoryImage}
                    layout="fill"
                    objectFit="cover"
                    alt="about-page-main-image"
                />
            </figure>
            <div className="category-overlay">
                <p>{categoryTitle}</p>
            </div>
        </div>
    );
};
export default AllCategoryCard;
