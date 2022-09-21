import { AllCategories } from "@components/AllCategories";
import Layout from "@components/Layout";
import urls from "constants/urls";
import type { GetStaticProps, NextPage } from "next";
import { Container } from "react-bootstrap";
import type { NestedCategoriesDataProps } from "types/nestedCategoryProps";
import { axiosClient } from "utils/axiosClient";

interface CategoriesPageProps {
    nestedCategoriesData: NestedCategoriesDataProps;
}
const CategoriesPage: NextPage<{
    nestedCategoriesData: CategoriesPageProps["nestedCategoriesData"];
}> = ({ nestedCategoriesData }) => {
    return (
        <Layout title="Categories | Cipher">
            <Container fluid="xl" className="px-5">
                <h2 className="all-categories-title">Cipher Categories</h2>
                {/* <div className="d-flex justify-content-center all-categories">
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
                </div> */}
                <AllCategories nestedCategoriesData={nestedCategoriesData} />
            </Container>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    try {
        const { data: nestedCategoriesData } = await axiosClient.get(
            urls.category.list
        );
        return {
            props: {
                nestedCategoriesData: nestedCategoriesData,
            },
            revalidate: 10,
        };
    } catch (err: any) {
        return {
            props: {
                nestedCategoriesData: [],
            },
            revalidate: 10,
        };
    }
};
export default CategoriesPage;
