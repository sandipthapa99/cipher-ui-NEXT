import { AllCategoriesCard } from "@components/AllCategoriesCard";
import { BreadCrumb } from "@components/common/BreadCrumb";
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
        <Layout
            title="Categories | Homaale"
            description="Browse all Homaale Categories"
            keywords="homaale-category, category, homaale"
        >
            <Container fluid="xl" className="px-4">
                <BreadCrumb currentPage={"Categories"} />

                <h2 className="all-categories-title">
                    Browse all Homaale Categories
                </h2>

                <AllCategoriesCard
                    nestedCategoriesData={nestedCategoriesData}
                />
                {/*<AllCategories nestedCategoriesData={nestedCategoriesData} />*/}
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
