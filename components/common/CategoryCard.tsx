import parse from "html-react-parser";
import Link from "next/link";
import type { HeroCategoryProps } from "types/heroCategory";

interface CategoryCardProps {
    name: string;
    icon: string;
    slug: string;
}

const CategoryCard = ({
    category,
}: {
    category: HeroCategoryProps["result"][0];
}) => {
    return (
        <Link href={`/service/category/${category.category.slug}`}>
            <a>
                <div className="category-card-block">
                    <div className="category-card-block__image-block">
                        <figure className="thumbnail-icon">
                            {category.category.icon &&
                                parse(category.category.icon)}
                        </figure>
                    </div>
                    <p>{category.category.name}</p>
                </div>
            </a>
        </Link>
    );
};
export default CategoryCard;
