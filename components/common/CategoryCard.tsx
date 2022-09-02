import parse from "html-react-parser";
import Link from "next/link";

interface CategoryCardProps {
    name: string;
    icon: string;
    slug: string;
}

const CategoryCard = ({ name, icon, slug }: CategoryCardProps) => {
    return (
        <Link href={`/service/category/${slug}?category=${name}`}>
            <a>
                <div className="category-card-block">
                    <div className="category-card-block__image-block">
                        <figure className="thumbnail-icon">
                            {icon && parse(icon)}
                        </figure>
                    </div>
                    <p>{name}</p>
                </div>
            </a>
        </Link>
    );
};
export default CategoryCard;
