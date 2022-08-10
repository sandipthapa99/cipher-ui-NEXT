import Link from "next/link";
import React from "react";
import { ALL_CATEGORIES } from "staticData/allCategories";

export const CategoriesListingHomepage = () => {
    return (
        <>
            <div className="all-categories">
                {ALL_CATEGORIES.map((category, index) => (
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
