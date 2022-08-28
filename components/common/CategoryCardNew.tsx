import { faArrowRight } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import parse from "html-react-parser";
import Link from "next/link";
import type { CategoryCardProps } from "types/categoryCard";

const CategoryCardNew = ({
    categorySlug,
    categoryTitle,
    categoryIcon,
}: CategoryCardProps) => {
    return (
        <div className="hero-category__card-block d-inline-block flex-row">
            <div className="wrapper d-flex flex-row">
                <div className="image-block">
                    <figure className="d-flex align-items-center justify-content-center thumbnail-icon">
                        {categoryIcon
                            ? parse(categoryIcon)
                            : parse(
                                  `<svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M29.6667 0.5H4.66667C3.5616 0.5 2.50179 0.938987 1.72039 1.72039C0.938987 2.50179 0.5 3.5616 0.5 4.66667V29.6667C0.5 30.7717 0.938987 31.8315 1.72039 32.6129C2.50179 33.3943 3.5616 33.8333 4.66667 33.8333H29.6667C30.7717 33.8333 31.8315 33.3943 32.6129 32.6129C33.3943 31.8315 33.8333 30.7717 33.8333 29.6667V4.66667C33.8333 3.5616 33.3943 2.50179 32.6129 1.72039C31.8315 0.938987 30.7717 0.5 29.6667 0.5ZM25.5 25.5H8.83333V8.83333H25.5V25.5ZM71.3333 0.5H46.3333C45.2283 0.5 44.1685 0.938987 43.3871 1.72039C42.6057 2.50179 42.1667 3.5616 42.1667 4.66667V29.6667C42.1667 30.7717 42.6057 31.8315 43.3871 32.6129C44.1685 33.3943 45.2283 33.8333 46.3333 33.8333H71.3333C72.4384 33.8333 73.4982 33.3943 74.2796 32.6129C75.061 31.8315 75.5 30.7717 75.5 29.6667V4.66667C75.5 3.5616 75.061 2.50179 74.2796 1.72039C73.4982 0.938987 72.4384 0.5 71.3333 0.5ZM67.1667 25.5H50.5V8.83333H67.1667V25.5ZM29.6667 42.1667H4.66667C3.5616 42.1667 2.50179 42.6057 1.72039 43.3871C0.938987 44.1685 0.5 45.2283 0.5 46.3333V71.3333C0.5 72.4384 0.938987 73.4982 1.72039 74.2796C2.50179 75.061 3.5616 75.5 4.66667 75.5H29.6667C30.7717 75.5 31.8315 75.061 32.6129 74.2796C33.3943 73.4982 33.8333 72.4384 33.8333 71.3333V46.3333C33.8333 45.2283 33.3943 44.1685 32.6129 43.3871C31.8315 42.6057 30.7717 42.1667 29.6667 42.1667ZM25.5 67.1667H8.83333V50.5H25.5V67.1667ZM58.8333 42.1667C49.6417 42.1667 42.1667 49.6417 42.1667 58.8333C42.1667 68.025 49.6417 75.5 58.8333 75.5C68.025 75.5 75.5 68.025 75.5 58.8333C75.5 49.6417 68.025 42.1667 58.8333 42.1667ZM58.8333 67.1667C54.2375 67.1667 50.5 63.4292 50.5 58.8333C50.5 54.2375 54.2375 50.5 58.8333 50.5C63.4292 50.5 67.1667 54.2375 67.1667 58.8333C67.1667 63.4292 63.4292 67.1667 58.8333 67.1667Z" fill="#752DE8"/></svg>`
                              )}
                    </figure>
                </div>
                <div className="details d-flex flex-column">
                    <h1>{categoryTitle}</h1>
                    <div className="d-flex justify-content-between">
                        <Link href={`category/${categorySlug}`}>
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
