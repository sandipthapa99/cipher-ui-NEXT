import Link from "next/link";
import React from "react";
import { Homepage_categories } from "staticData/allCategories";

const CategoriesListingHomepage = () => {
    return (
        <>
            <div className="d-flex justify-content-center all-categories">
                {Homepage_categories.map((category, index) => (
                    <div key={index} className="category-item">
                        <h4 className="category-item__title title">
                            {category.title}
                        </h4>
                        <div className="category-item__subitems">
                            {category.subItems.map((subItem, index) => (
                                <Link key={index} href={subItem.href}>
                                    <a className="category-item__subitems--title">
                                        {subItem.title}
                                    </a>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default CategoriesListingHomepage;
