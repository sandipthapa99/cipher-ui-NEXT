import Layout from "@components/Layout";
import type { GetStaticProps } from "next";
import Link from "next/link";
import { Container } from "react-bootstrap";
import type { AllCategory } from "staticData/allCategories";
import { ALL_CATEGORIES } from "staticData/allCategories";

interface CategoriesPageProps {
    categories: AllCategory[];
}
const CategoriesPage = ({ categories }: CategoriesPageProps) => {
    return (
        <Layout title="Categories | Cipher">
            <Container fluid="xl">
                <h2 className="all-categories-title">Cipher Categories</h2>
                <div className="all-categories">
                    {categories.map((category, index) => (
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
            </Container>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = () => {
    return {
        props: {
            categories: ALL_CATEGORIES,
        },
    };
};
export default CategoriesPage;
